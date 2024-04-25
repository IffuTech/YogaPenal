import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid } from '@mui/material';
import { API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';

export default function FaqDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
  //  const [blogdata, setBlogData] = React.useState({});
    const [alignment, setAlignment] = React.useState("home");

    const storedIsActive = localStorage.getItem('isActive');

    let defaultIsActive;
    try {
        defaultIsActive = storedIsActive ? JSON.parse(storedIsActive) : true;
    } catch (error) {
        console.error('Error parsing storedIsActive:', error);
        defaultIsActive = true;
    }
   const [blogdata, setBlogData] = React.useState({
    isActive: defaultIsActive,
    name: "",

   });
   const [existingRoles, setExistingRoles] = React.useState([]);
  

    const handleChange = (e) => {
        debugger;
        const { name, value } = e.target;
        setBlogData({
            ...blogdata,
            [name]: value
        })
    }
    const validRoles = ["admin", "tutor", "student"];
    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
    
        try {
            const enteredRole = blogdata?.name?.toLowerCase();
    
            if (!validRoles.includes(enteredRole)) {
                enqueueSnackbar(`Invalid role. Please enter a valid role ("admin," "student," or "tutor").`, { variant: "error" });
                return;
            }
    
            if (existingRoles.includes(enteredRole)) {
                enqueueSnackbar(`Duplicate role. Role "${enteredRole}" already exists.`, { variant: "error" });
                return;
            }
    
            if (existingRoles.length === 3) {
                enqueueSnackbar(`Cannot add more than 3 roles.`, { variant: "error" });
                return;
            }
    
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/role`;
            else url = `${API_ENDPOINT}/api/create/role`;
    
            const { status, data: { message } } = await axios.post(url, { ...blogdata, isActive: true }, { headers });
    
            if (status === 200) {
                enqueueSnackbar(`${message}`, { variant: "success" });
                props.onClose();
                props.getBlogs();
                localStorage.setItem('isActive', JSON.stringify(blogdata?.isActive));
    
                if (!existingRoles.includes(enteredRole)) {
                    setExistingRoles((prevRoles) => [...prevRoles, enteredRole]);
                }
            }
        } catch (e) {
            enqueueSnackbar(`${e?.response?.data?.message}`, { variant: "error" });
        }
    };

   

    React.useEffect(() => {
        if (props.id) {
            setBlogData(props.params)
        } else {
            setBlogData({
                ...blogdata,
                isActive: defaultIsActive,
                name: "",
            });
        }
    }, [props.id, defaultIsActive,props.params])

    return (
        <div>
            <Dialog open={open} onClose={() => { setBlogData({isActive:defaultIsActive,name:""}); setAlignment("home"); onClose(); }}>
                <DialogTitle>{props.id ? "Update Role" : "Add Role"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="name"
                                    required
                                    name="name"
                                    label="Name"
                                    color='success'
                                    value={blogdata?.name || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='success' onClick={() => { setBlogData({}); onClose(); }}>Cancel</Button>
                        <Button variant='contained' color='success' type="submit">{props?.id ? "Update" : "Add"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}