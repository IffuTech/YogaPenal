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
import DealsAndOffersDialog from "../dialogs/DealsAndOffersDialog";
import ImageDialog from "../dialogs/ImageDialog";
import { API_ENDPOINT } from "../utils/constants";
import {enqueueSnackbar} from 'notistack';

export default function DealsAndOffers() {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [users, setUsers] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [params, setParams] = React.useState(null);
    const [id, setId] = React.useState(false);
    const [isActive, setIsActive] = React.useState(null);
    const [id2, setId2] = React.useState(null);
    const [rows, setRows] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [imageName, setImageName] = React.useState("");
    const token = localStorage.getItem('token')
    const columns = [
        {
            id: 'is_active',
            label: 'IsActive',
            align: 'center',
            minWidth: 170,
            renderCell: (params, id) => {
                return (<FormControlLabel sx={{ marginRight: 0 }} control={<Switch color="success" onChange={(event) => {
                    setIsActive(event.target.checked);
                    setId2(params?._id) }} defaultChecked={params?.isActive}  />}
                />)
            }
        },
        { id: 'title', label: 'Title', align: 'center', minWidth: 170 },
        { id: 'priorityNo', label: 'Priority No', align: 'center', minWidth: 170 },
        {
            id: 'image', label: 'Image', align: 'center', minWidth: 170,
            renderCell: (params) => {
                return (<Avatar sx={{ margin: "auto", cursor: "pointer" }} variant="square"
                    src={`${API_ENDPOINT}/dealsAndOffers/${params?.image}`}
                    onClick={() => {
                        setOpen(true);
                        setImageName(`${API_ENDPOINT}/dealsAndOffers/${params?.image}`);
                    }}>
                    <AssignmentIcon />
                </Avatar>)
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

    const getUsers = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/deals-and-offers`, { headers });
        if (status === 200) {
            setSuccess(true);
            setRows(data);
        }
    }

    const updateUser = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const { status, data: { message } } = await axios.post(`${API_ENDPOINT}/api/update/deals-and-offer`, {
                dealsAndOffersId: id2,
                isActive: isActive
            }, { headers });
            if (status === 200) enqueueSnackbar(`${message}`, { variant: "success" });
            else enqueueSnackbar(`Something went wrong`, { variant: "error" });
        } catch (e) {
            enqueueSnackbar(`Something went wrong`, { variant: "error" });
        }
    }

    
    const handleDelete = async (dealId) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
    
            const { status } = await axios.patch(
                `http://localhost:4210/api/delete/deals/${dealId}`,
                null, 
                {
                    headers: headers,
                }
            );
    
            if (status === 200) {
                enqueueSnackbar(` Deals and Offer deleted successfully`, { variant: "success" });
            } else {
                enqueueSnackbar(`Failed to delete Deals and offers`, { variant: "error" });
            }
        } catch (error) {
            console.error("Error deleting Deals and offers:", error);
            enqueueSnackbar(`Failed to delete Deals and offers`, { variant: "error" });
        }
    };
    
    React.useEffect(() => {
        id2 && updateUser();
    }, [isActive, id2]);

    React.useEffect(() => {
        getUsers();
    }, []);
    return (
        <Grid>
            <Grid container>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Grid xs={12} md={4}>
                        <Typography variant={"h5"} sx={{ margin: "10px" }}>Deals And Offers</Typography>
                    </Grid>
                    <Grid xs={12} md={4} sx={{ p: { xs: '10px', md: "0" } }}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search DealsAndOffers"
                                onChange={(searchVal) => setUsers(searchVal?.target.value)}
                                inputProps={{ 'aria-label': 'search dealsAndOffers' }}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "start", md: "end" } }} >
                        <Button sx={{ margin: "10px" }} color="success" variant="contained" onClick={() => setDialogOpen(true)}>Add DealsAndOffers</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ overflow: "auto", marginTop:"15px" }}>
                    <NewTable columns={columns} rows={rows} success={success} queryString={users} />
                </Grid>
            </Grid>
            <ImageDialog open={open && imageName} onClose={() => setOpen(false)} name={imageName} />
            <DealsAndOffersDialog open={dialogOpen} getUsers={getUsers} params={params} id={id} onClose={() => setDialogOpen(false)} />
        </Grid>
    );
}