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
    const [blogdata, setBlogData] = React.useState({});
    const [alignment, setAlignment] = React.useState("home");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogdata,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };

        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/plan`
            else url = `${API_ENDPOINT}/api/create/plan`
            const { status, data: { message } } = await axios.post(url, blogdata, { headers })
            if (status === 200)
                enqueueSnackbar(`${message}`, { variant: "success" });
            props.onClose();
            props.getBlogs();
        } catch (e) {
            enqueueSnackbar(`${e?.response?.data?.message}`, { variant: "error" });
        }
    }

    React.useEffect(() => {
        if (props.id) {
            setBlogData(props.params)
        } else {
            setBlogData({})
        }
    }, [props.id])

    return (
        <div>
            <Dialog open={open} onClose={() => { setBlogData({}); setAlignment("home"); onClose(); }}>
                <DialogTitle>{props?.id ? "Update Plan" : "Add Plan"}</DialogTitle>
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
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="price"
                                    required
                                    name="price"
                                    label="Price"
                                    color='success'
                                    value={blogdata?.price || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="name"
                                    required
                                    name="name"
                                    label="Name"
                                    value={blogdata?.name || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid> */}
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