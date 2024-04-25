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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function DealsAndOffersDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const [userdata, setUserData] = React.useState({});
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageURL, setImageURL] = React.useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setImageURL(imageUrl);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userdata,
            [name]: value
        })
    }


    console.log(userdata, "pppppppppppppppp");
    const formData = new FormData();
    if (props?.id) {
        formData.append('image', selectedImage);
        formData.append('title', userdata?.title);
        formData.append('priorityNo', userdata?.priorityNo);
        formData.append('dealsAndOffersId', userdata?._id);
    } else {
        formData.append('image', selectedImage);
        formData.append('title', userdata?.title);
        formData.append('priorityNo', userdata?.priorityNo);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/deals-and-offer`
            else url = `${API_ENDPOINT}/api/create/deals-and-offers`
            const { status, data: { message } } = await axios.post(url, formData,{headers})
            if (status === 200)
                enqueueSnackbar(`${message}`, { variant: "success" });
            props.onClose();
            props.getUsers();
        } catch (e) {
            enqueueSnackbar(`${e?.response?.data?.message}`, { variant: "error" });
        }
    }


    React.useEffect(() => {
        if (props.id) {
            setUserData(props.params)
        } else {
            setUserData({})
        }
    }, [props.id])

    return (
        <div>
            <Dialog open={open} onClose={() => { onClose(); setUserData({}) }}>
                <DialogTitle>{props?.id ? "Update Deals And Offers" : "Add Deals And Offers"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} item xs={12} >
                                <Grid xs={8}>
                                    <Button size='small' color="success" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload DealsAndOffers
                                        <VisuallyHiddenInput type="file" accept='image/*' name="image" onChange={(e) => handleImageChange(e)} />
                                    </Button>
                                </Grid>
                                <Grid xs={4}>
                                    {imageURL && (
                                        <img
                                            src={imageURL}
                                            alt="Selected"
                                            style={{ maxWidth: '50px', maxHeight: '50px' }}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id='priorityNo'
                                    type="number"
                                    name="priorityNo"
                                    label="Priority No"
                                    variant='outlined'
                                    color='success'
                                    value={userdata?.priorityNo || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id='Title'
                                    type="text"
                                    name="title"
                                    label="Title"
                                    variant='outlined'
                                    color='success'
                                    value={userdata?.title || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => { onClose(); setUserData({}) }}>Cancel</Button>
                        <Button variant='contained' color="success" type="submit">{props?.id ? "Update" : "Add"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}