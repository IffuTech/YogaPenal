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

export default function GoalDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const [blogdata, setBlogData] = React.useState({});
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageURL, setImageURL] = React.useState('');
    const [Cdata, setCdata] = React.useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogdata,
            [name]: value
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setImageURL(imageUrl);
        }
    };

    const formData = new FormData();
    if (props?.id) {
        formData.append('icon', selectedImage);
        formData.append('content', blogdata?.content);
        formData.append('name', blogdata?.name);
        formData.append('priorityNo', blogdata?.priorityNo);
        formData.append('statusId', blogdata?.statusId);
        formData.append('goalId', blogdata?._id);
    } else {
        formData.append('icon', selectedImage);
        formData.append('content', blogdata?.content);
        formData.append('priorityNo', blogdata?.priorityNo);
        formData.append('name', blogdata?.name);
        formData.append('statusId', blogdata?.statusId);
    }

    // console.log(blogdata, props.id, "pppppppppppppppp");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const headers = { Authorization: `Bearer ${token}` };
        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/goal`
            else url = `${API_ENDPOINT}/api/create/goal`
            const { status, data: { message } } = await axios.post(url, formData)
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
            <Dialog open={open} onClose={() => { onClose(); setBlogData({}); }}>
                <DialogTitle>{props?.id ? "Update Goal" : "Add Goal"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} item xs={12} >
                                <Grid xs={8}>
                                    <Button size='small' color="success" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Icon
                                        <VisuallyHiddenInput type="file" accept='image/*' name="image" onChange={(e) => handleImageChange(e)} />
                                    </Button>l
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
                                    id="content"
                                    // required
                                    name="content"
                                    label="Content"
                                    color='success'
                                    value={blogdata?.content || ""}
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
                        <Button variant='contained' color="success" onClick={() => { onClose(); setBlogData({}); }}>Cancel</Button>
                        <Button variant='contained' color="success" type="submit">{props?.id ? "Update" : "Add"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}