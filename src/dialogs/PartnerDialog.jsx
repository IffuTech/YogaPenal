import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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


export default function PartnerDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const [file, setFile] = React.useState(null);
    const [userdata, setUserData] = React.useState({});
    const [role, setRole] = React.useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageURL, setImageURL] = React.useState('');
    const [imageURL2, setImageURL2] = React.useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setImageURL(imageUrl);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const imageUrl2 = URL.createObjectURL(file);
            setImageURL2(imageUrl2);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userdata,
            [name]: value
        })
    }
    const getRoles = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/roles`, { headers });
        if (status === 200) {
            // setSuccess(true);
            setRole(data);
        }
    }

    React.useEffect(() => {
        getRoles();
    }, []);


    const formdata = new FormData();

    if (props?.id) {
        formdata.append("image", file)
        formdata.append('video', selectedImage);
        formdata.append("_id", userdata?._id)
        formdata.append("fullName", userdata?.fullName)
        formdata.append("contact", userdata?.contact)
        formdata.append("email", userdata?.email)
        formdata.append("password", userdata?.password)
        formdata.append("gender", userdata?.gender)
        formdata.append("pincode", userdata?.pincode)
        formdata.append("address", userdata?.address)
        formdata.append("state", userdata?.state)
        formdata.append("priorityNo", userdata?.priorityNo)
        formdata.append("roleId", userdata?.roleId)
        formdata.append("description", userdata?.description)
        // formdata.append("partnerId", user?._id)
        // formdata.append("partner", user?._id)
    } else {
        formdata.append('image', file);
        formdata.append('video', selectedImage);
        formdata.append("fullName", userdata?.fullName)
        formdata.append("contact", userdata?.contact)
        formdata.append("email", userdata?.email)
        formdata.append("password", userdata?.password)
        formdata.append("gender", userdata?.gender)
        formdata.append("priorityNo", userdata?.priorityNo)
        formdata.append("pincode", userdata?.pincode)
        formdata.append("address", userdata?.address)
        formdata.append("state", userdata?.state)
        formdata.append("roleId", userdata?.roleId)
        formdata.append("description", userdata?.description)
        // formdata.append("partnerId", user?._id)
        // formdata.append("partner", user?._id)
    }


    // console.log(userdata, "pppppppppppppppp");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/partner`
            else url = `${API_ENDPOINT}/api/create/partner`
            const { status, data: { message } } = await axios.post(url, formdata, { headers })
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
                <DialogTitle>{props?.id ? "Update Partner" : "Add Partner"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} item xs={12} >
                                <Grid xs={6}>
                                    <Button size='small' color="success" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Profile
                                        <VisuallyHiddenInput type="file" accept='image/*' onChange={handleFileChange} />
                                    </Button>
                                </Grid>
                                <Grid xs={6}>
                                    {imageURL2 && (
                                        <img
                                            src={imageURL2}
                                            alt="Selected"
                                            style={{ maxWidth: '50px', maxHeight: '50px' }}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} item xs={12} >
                                <Grid xs={6}>
                                    <Button size='small' color="success" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Video
                                        <VisuallyHiddenInput type="file" accept='video/*' onChange={handleImageChange} />
                                    </Button>
                                </Grid>
                                <Grid xs={6}>
                                    {imageURL && (
                                        <video
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
                                    name="fullName"
                                    label="FullName"
                                    color='success'
                                    value={userdata?.fullName || ""}
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
                                    value={userdata?.priorityNo || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <FormControl size='small' sx={{ width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        color='success'
                                        onChange={handleChange}
                                        name="password"
                                        value={userdata?.password || ""}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="gender"
                                    // required
                                    name="gender"
                                    label="Gender"
                                    type="text"
                                    color='success'
                                    variant="outlined"
                                    value={userdata?.gender || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="pincode"
                                    // required
                                    name="pincode"
                                    label="PinCode"
                                    type="text"
                                    color='success'
                                    variant="outlined"
                                    value={userdata?.pincode || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="address"
                                    // required
                                    name="address"
                                    label="Address"
                                    type="text"
                                    color='success'
                                    variant="outlined"
                                    value={userdata?.address || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="state"
                                    // required
                                    name="state"
                                    label="State"
                                    type="text"
                                    color='success'
                                    variant="outlined"
                                    value={userdata?.state || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        // required
                                        name='roleId'
                                        color='success'
                                        value={userdata?.roleId || ""}
                                        label="Role"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {role?.map(({ _id, name }) => {
                                            return (<MenuItem value={_id}>{name}</MenuItem>)
                                        })}

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    color='success'
                                    value={userdata?.description || ""}
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