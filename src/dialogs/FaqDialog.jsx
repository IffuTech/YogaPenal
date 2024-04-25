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
import { Box, Grid } from '@mui/material';
import { API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FaqDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const [blogdata, setBlogData] = React.useState({});
    const [alignment, setAlignment] = React.useState('home');

    const handleTypeChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogdata,
            [name]: value
        })
    }
    const finalData = {...blogdata, ...{type:alignment}}
    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
        
        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/faq`
            else url = `${API_ENDPOINT}/api/create/faq`
            const updatedFinalData = { ...finalData, isActive: true };
            const { status, data: { message } } = await axios.post(url,updatedFinalData,{headers})
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
            setAlignment(props?.params?.type)
        } else {
            setBlogData({})
            setAlignment("home")
        }
    }, [props.id])

    return (
        <div>
            <Dialog open={open} onClose={() => { setBlogData({}); setAlignment("home"); onClose(); }}>
                <DialogTitle>{props?.id ? "Update Faq" : "Add Faq"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                Select Type:-   
                                <ToggleButtonGroup
                                    color="success"
                                    value={alignment}
                                    exclusive
                                    onChange={handleTypeChange}
                                    aria-label="Platform"
                                >
                                    <ToggleButton value="home">Home</ToggleButton>
                                    <ToggleButton value="both">Both</ToggleButton>
                                    <ToggleButton value="tutor">Tutor</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="qa"
                                    required
                                    name="qa"
                                    label="QA"
                                    color='success'
                                    value={blogdata?.qa || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="answer"
                                    required
                                    name="answer"
                                    label="Answer"
                                    color='success'
                                    value={blogdata?.answer || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="priorityNo"
                                    type='number'
                                    name="priorityNo"
                                    label="Priority No"
                                    color='success'
                                    value={blogdata?.priorityNo || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => { setAlignment("home");  setBlogData({}); onClose(); }}>Cancel</Button>
                        <Button variant='contained' color="success" type="submit">{props?.id ? "Update" : "Add"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}