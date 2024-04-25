import React from "react";
import { Button, FormControlLabel, Switch, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Edit,Delete, Tune } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NewTable from "../components/NewTable";
import UserDialog from "../dialogs/UserDialog";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import ImageDialog from "../dialogs/ImageDialog";
import FilterDialog from "../dialogs/FilterDialog";
import {enqueueSnackbar} from 'notistack';

export default function User() {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [users, setUsers] = React.useState("");
    const [filter, setFilter] = React.useState({});
    const [date, setDate] = React.useState({});
    const [success, setSuccess] = React.useState(false);
    const [params, setParams] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [isActive, setIsActive] = React.useState(true);
    console.log('Initial isActive state:', isActive);
    const [id2, setId2] = React.useState(null);
    const [rows, setRows] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [imageName, setImageName] = React.useState("");
    const token = localStorage.getItem('token')
    const columns = [
        {
            id: 'is_active',
            label: 'IsActive',
            align: 'center',
            minWidth: 170,
            renderCell: (params) => {
                const isActiveState = params?.isActive || false;
                console.log("paramssssssss",params)
                return (<FormControlLabel sx={{ marginRight: 0 }} control={<Switch color="success" 
                onChange={(event) => handleSwitchChange(event, params._id)}
            
                    checked={isActiveState}  />}
                />)
            }
        },
        {
            id: 'image', label: 'Profile', align: 'center', minWidth: 170,
            renderCell: (params) => {
                return (<Avatar sx={{ margin: "auto", cursor: "pointer" }} variant="square"
                    src={`${API_ENDPOINT}/userImages/${params?.image}`}
                    onClick={() => {
                        setOpen(true);
                        setImageName(`${API_ENDPOINT}/userImages/${params?.image}`);
                    }}>
                    <AssignmentIcon />
                </Avatar>)
            }
        },
        { id: 'fullName', label: 'Name', align: 'center', minWidth: 170 },
        { id: 'contact', label: 'Phone', align: 'center', minWidth: 100 },
        {
            id: 'email',
            label: 'Email',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'goal',
            label: 'Goal',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'gender',
            label: 'Gender',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'pincode',
            label: 'PinCode',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'address',
            label: 'Address',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'state',
            label: 'State',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'createdAt',
            label: 'CreatedAt',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'updatedAt',
            label: 'updatedAt',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
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
                    setId(params._id);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDate({
            ...date,
            [name]: value
        })
    }
    const handleSwitchChange = async (event, rowId) => {
        debugger;
        const newRows = rows.map((row) =>
            row._id === rowId ? { ...row, isActive: event.target.checked } : row
        );
        setRows(newRows);
    
        try {
            debugger;
            const headers = { Authorization: `Bearer ${token}` };
            const { status, data } = await axios.post(
                `${API_ENDPOINT}/api/update/user`,
                {
                    _id: rowId,
                    isActive: event.target.checked,
                },
                { headers }
            );
            if (status === 200) {
                enqueueSnackbar(`User updated successfully`, { variant: "success" });
            } else {
                enqueueSnackbar(`Failed to update isActive state`, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar(`Failed to update isActive state`, { variant: "error" });
        }
    };
    const handleDelete = async (userId) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
    
            const { status } = await axios.patch(
                `http://localhost:4210/api/delete/user/${userId}`,
                null, 
                {
                    headers: headers,
                }
            );
    
            if (status === 200) {
                enqueueSnackbar(`User deleted successfully`, { variant: "success" });
            } else {
                enqueueSnackbar(`Failed to delete user`, { variant: "error" });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            enqueueSnackbar(`Failed to delete user`, { variant: "error" });
        }
    };
    
    

      
 

    const getUsers = async (url) => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(url, { headers });
        if (status === 200) {
            setSuccess(true);
            setRows(data);
        }
    }

    React.useEffect(() => {
        var url;
        if (Object.keys(date).length) {
            url = `${API_ENDPOINT}/api/retrieve/users?startDate=${date?.startDate}&endDate=${date?.endDate}`
        } else {
            url = Object.keys(filter).length
                ?
                `${API_ENDPOINT}/api/retrieve/users?state=${filter?.state}&gender=${filter?.gender}`
                :
                `${API_ENDPOINT}/api/retrieve/users`
        }

        if (Object.keys(filter).length) getUsers(url);
        else getUsers(url)
    }, [filter?.state, filter?.gender, date?.startDate, date?.endDate]);



    React.useEffect(() => {
        console.log('Component rerendered. isActive:', isActive, 'id2:', id2);
        id2 && handleSwitchChange();
    }, [isActive, id2]);
    

    return (
        <Grid>
            <Grid container>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Grid container sx={{ display: "flex", width: "100%" }}>
                        <Grid xs={12} md={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <Typography variant={"h5"} sx={{ margin: "10px" }}>Users</Typography>
                        </Grid>
                        <Grid xs={12} md={4} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                            <Grid sx={{ marginLeft: "5px", marginRight: "5px" }}>
                                Start Date<TextField
                                    fullWidth
                                    size="small"
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid sx={{ marginRight: "15px" }}>
                                End Date <TextField
                                    fullWidth
                                    size="small"
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={4} sx={{ p: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Paper
                                component="form"
                                sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: "100%", height: "46px" }}
                                size="small"
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    size="small"
                                    placeholder="Search Users"
                                    onChange={(searchVal) => setUsers(searchVal?.target.value)}
                                    inputProps={{ 'aria-label': 'search users' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                            <Grid>
                                <Button sx={{ margin: "10px" }} color="success" variant="contained" onClick={() => setOpen2(true)}><Tune /></Button>
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={2} sx={{ display: "flex", justifyContent: { xs: "start", md: "center" }, alignItems: { xs: "start", md: "center" } }}>
                            <Button sx={{ margin: "10px" }} color="success" variant="contained" onClick={() => setDialogOpen(true)}>Add User</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ overflow: "auto", marginTop: "15px" }}>
                    <NewTable columns={columns} rows={rows} success={success} queryString={users} />
                </Grid>
            </Grid>
            <FilterDialog open={open2} onClose={() => setOpen2(false)} setFilter={setFilter} />
            <ImageDialog open={open && imageName} onClose={() => setOpen(false)} name={imageName} />
            <UserDialog open={dialogOpen} getUsers={getUsers} params={params} id={id} onClose={() => setDialogOpen(false)} />
        </Grid>
    );
}