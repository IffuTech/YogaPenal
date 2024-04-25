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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

export default function BlogDialog(props) {
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
        formData.append('image', selectedImage);
        formData.append('content', Cdata);
        formData.append('name', blogdata?.name);
        formData.append('statusId', blogdata?.statusId);
        formData.append('blogId', blogdata?._id);
    } else {
        formData.append('image', selectedImage);
        formData.append('content', Cdata);
        formData.append('name', blogdata?.name);
        formData.append('statusId', blogdata?.statusId);

    }

    // console.log(blogdata, props.id, "pppppppppppppppp");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/blog`
            else url = `${API_ENDPOINT}/api/create/blog`
            const { status, data: { message } } = await axios.post(url, formData,{headers})
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
            setCdata({})
        }
    }, [props.id])

    return (
        <div>
            <Dialog open={open} onClose={() => { onClose(); setBlogData({}); setCdata({}) }}>
                <DialogTitle>{props?.id ? "Update Blog" : "Add Blog"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} item xs={12} >
                                <Grid xs={8}>
                                    <Button size='small' color="success" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Blog Banner
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
                            {/* <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        required
                                        name='statusId'
                                        color='success'
                                        value={blogdata?.statusId || ""}
                                        label="Status"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <MenuItem value={1}>Active</MenuItem>
                                        <MenuItem value={2}>Pending</MenuItem>
                                        <MenuItem value={3}>Reject</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Grid
                                >
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={`<p>${blogdata?.description || ""}</p>`}
                                        onReady={(editor) => {
                                            console.log("CKEditor5 React Component is ready to use!", editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setCdata(data && JSON.stringify(data))
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => { onClose(); setBlogData({}); setCdata({}) }}>Cancel</Button>
                        <Button variant='contained' color="success" type="submit">{props?.id ? "Update" : "Add"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}