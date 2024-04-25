import React from "react";
import { Button, FormControlLabel, Switch, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Edit,Delete } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NewTable from "../components/NewTable";
import axios from "axios";
import BlogDialog from "../dialogs/BlogDialog";
import ImageDialog from "../dialogs/ImageDialog";
import { API_ENDPOINT } from "../utils/constants";
import {enqueueSnackbar} from 'notistack';

export default function Blogs() {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [blogs, setBlogs] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [params, setParams] = React.useState(null);
    const [id, setId] = React.useState(false);
    const [isActive, setIsActive] = React.useState(null);
    const [id2, setId2] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [imageName, setImageName] = React.useState("");
    const [rows, setRows] = React.useState();
    const token = localStorage.getItem('token');
    const columns = [
        {
            id: 'is_active',
            label: 'IsActive',
            align: 'center',
            minWidth: 170,
            renderCell: (params, id) => {
              
                return (<FormControlLabel sx={{ marginRight: 0 }} control={<Switch color="success" onChange={(event) => {
                    setIsActive(event.target.checked);
                    setId2(params?._id)
                }}
                defaultChecked={params?.isActive} />
                }
                />)
            }
        },
        { id: 'name', label: 'Name', align: 'center', minWidth: 170 },
        {
            id: 'image', label: 'Image', align: 'center', minWidth: 170,
            renderCell: (params) => {
                return (<Avatar sx={{ margin: "auto", cursor: "pointer" }} variant="square"
                    src={`${API_ENDPOINT}/blogImages/${params?.image}`}
                    onClick={() => {
                        setOpen(true);
                        setImageName(`${API_ENDPOINT}/blogImages/${params?.image}`);
                    }}>
                    <AssignmentIcon />
                </Avatar>)
            }
        },
        {
            id: 'description', label: 'Content', align: 'center', minWidth: 100,
            renderCell: (params) => {
                return
                
                <div>{JSON.parse(params?.description)}</div>
            }
        },
        {
            id: 'action',
            label: 'Action',
            align: 'center',
            minWidth: 170,
            renderCell: (params,_id) => (
        
              <div>
                <IconButton
                  type="button"
                  onClick={() => {
                    setDialogOpen(true);
                    setParams(params);
                    setId(params?._id);
                  }}
                  aria-label="edit"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  type="button"
                  onClick={() => handleDelete(params._id)}
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
              </div>
            ),
          },
      
    ];

    const updateUser = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const { status, data: { message } } = await axios.post(`${API_ENDPOINT}/api/update/blog`, {
                blogId: id2,
                isActive: isActive
            }, { headers });
            if (status === 200) enqueueSnackbar(`${message}`, { variant: "success" });
            else enqueueSnackbar(`Something went wrong`, { variant: "error" });
        } catch (e) {
            enqueueSnackbar(`Something went wrong`, { variant: "error" });
        }
    }

    const handleDelete = async (blogId) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
    
            const { status } = await axios.patch(
                `http://localhost:4210/api/delete/blog/${blogId}`,
                null, 
                {
                    headers: headers,
                }
            );
    
            if (status === 200) {
                enqueueSnackbar(` Blog deleted successfully`, { variant: "success" });
            } else {
                enqueueSnackbar(`Failed to delete Blog`, { variant: "error" });
            }
        } catch (error) {
            console.error("Error deleting  Blog:", error);
            enqueueSnackbar(`Failed to delete Blog `, { variant: "error" });
        }
    };

    const getBlogs = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/blogs`, { headers });
        if (status === 200) {
            setSuccess(true);
            setRows(data);
        }
    }
    console.log(rows);
    React.useEffect(() => {
        getBlogs();
    }, []);

    React.useEffect(() => {
        id2 && updateUser();
    }, [isActive, id2]);

    

    return (
        <Grid>
            <Grid>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Grid xs={12} md={4}>
                        <Typography variant={"h5"} sx={{ margin: "10px" }}>Blogs</Typography>
                    </Grid>
                    <Grid xs={12} md={4} sx={{ p: { xs: '10px', md: "0" } }}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Blogs"
                                onChange={(searchVal) => setBlogs(searchVal?.target.value)}
                                inputProps={{ 'aria-label': 'search blogs' }}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "start", md: "end" } }} >
                        <Button sx={{ margin: "10px" }} color="success" variant="contained" onClick={() => setDialogOpen(true)}>Add Blog</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ overflow: "auto", marginTop: "15px" }}>
                    {rows && <NewTable columns={columns} rows={rows} success={success} queryString={blogs} />}
                </Grid>
            </Grid>
            <ImageDialog open={open && imageName} onClose={() => setOpen(false)} name={imageName} />
            <BlogDialog open={dialogOpen} getBlogs={getBlogs} params={params} id={id} onClose={() => setDialogOpen(false)} />
        </Grid>
    );
}