import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Close } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';

export default function OrderDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const [userdata, setUserData] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userdata,
            [name]: value
        })
    }



    console.log(userdata,"pppppppppppppppp");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const headers = { Authorization: `Bearer ${token}` };
        try {
            let url;
            if(props?.id) url = `${API_ENDPOINT}/api/update/user`
            else url = `${API_ENDPOINT}/api/create/user`
            const { status, data: { message } } = await axios.post(url, userdata)
            if (status === 200)
                enqueueSnackbar(`${message}`, { variant: "success" });
                props.onClose();
                props.getUsers();
        } catch (e) {
            enqueueSnackbar(`${e?.response?.data?.message}`, { variant: "error" });
        }
    }


    React.useEffect(()=>{
        if(props.id){
           setUserData(props.params)
        }else{
           setUserData({})
        }
       },[props.id])

    return (
        <div>
            <Dialog open={open} onClose={() => { onClose(); setUserData({}) }}>
                <DialogTitle>{props?.id ? "Update User":  "Add User"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="name"
                                    required
                                    name="fullName"
                                    label="FullName"
                                    color='success'
                                    value={userdata?.fullName || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    required
                                    id="mobile_number"
                                    name="contact"
                                    label="Contact number"
                                    variant="outlined"
                                    type="number"
                                    color='success'
                                    onWheel={(e) => e.target.blur()}
                                    value={userdata?.contact || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="email"
                                    required
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    color='success'
                                    value={userdata?.email || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="password"
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    color='success'
                                    value={userdata?.password || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        required
                                        name='roleId'
                                        color='success'
                                        value={userdata?.roleId || ""}
                                        label="Role"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <MenuItem value={1}>Admin</MenuItem>
                                        <MenuItem value={2}>User</MenuItem>
                                        <MenuItem value={3}>Instructor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Plans</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        required
                                        name='planId'
                                        color='success'
                                        value={userdata?.planId || ""}
                                        label="Plans"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <MenuItem value={1}>Basic</MenuItem>
                                        <MenuItem value={2}>Team</MenuItem>
                                        <MenuItem value={3}>Company</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={() => { onClose(); setUserData({}) }}>Cancel</Button>
                        <Button variant='contained' type="submit">{props?.id ? "Update":  "Add"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}