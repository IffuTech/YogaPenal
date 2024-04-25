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

export default function UserDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    // const storedIsActive = localStorage.getItem('isActive');
    // const defaultIsActive = storedIsActive ? JSON.parse(storedIsActive) : true;
    // const [userdata, setUserData] = React.useState({
    //     isActive: defaultIsActive
        
    // });

    const storedIsActive = localStorage.getItem('isActive');

   let defaultIsActive;
try {
    defaultIsActive = storedIsActive ? JSON.parse(storedIsActive) : true;
} catch (error) {
    console.error('Error parsing storedIsActive:', error);
    defaultIsActive = true; // Set a default value if parsing fails
}

const [userdata, setUserData] = React.useState({
    isActive: defaultIsActive,
});
    const [role, setRole] = React.useState();
    const [plan, setPlan] = React.useState();
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageURL, setImageURL] = React.useState('');
    const [errors, setErrors] = React.useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setImageURL(imageUrl);
        }
    };

    console.log("userdataaaaaaaaaaaa",userdata)

    const handleChange = (e) => {
        const { name, value ,type,checked} = e.target;
        let updatedValue = value;

        if (type === 'checkbox') {
            updatedValue = checked;
        }
        let updatedErrors = { ...errors };

        if (name === 'email') {

           
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                updatedErrors = { ...updatedErrors, email: 'Invalid email format' };
            } else {
                delete updatedErrors.email;
            }
        } else if (name === 'contact') {
         
            const maxLength = 10;
            if (value.length !== maxLength) {
                updatedErrors = { ...updatedErrors, contact: 'Contact number must be 10 digits' };
            } else {
                delete updatedErrors.contact; 
            }
        }

        setUserData({
            ...userdata,
            [name]: updatedValue
        });
        setErrors(updatedErrors);
    };

    const getRoles = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/roles`, { headers });
        if (status === 200) {
            // setSuccess(true);
            setRole(data);

            console.log("dataaaaaaaaaaa",data)
        }
    }

    const getPlans = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/plans`, { headers });
        if (status === 200) {
            // setSuccess(true);
            setPlan(data);
        }
    }

    React.useEffect(() => {
        getRoles();
        getPlans();
    }, []);

    console.log(userdata, "pppppppppppppppp");

    const formdata = new FormData();
    if (props?.id) {
        formdata.append("image", selectedImage)
        formdata.append("_id", userdata?._id)
        formdata.append("fullName", userdata?.fullName)
        formdata.append("contact", userdata?.contact)
        formdata.append("email", userdata?.email)
        formdata.append("password", userdata?.password)
        formdata.append("gender", userdata?.gender)
        formdata.append("pincode", userdata?.pincode)
        formdata.append("address", userdata?.address)
        formdata.append("state", userdata?.state)
        formdata.append("roleId", userdata?.roleId)
        formdata.append("planId", userdata?.planId)
        formdata.append("partnerId", user?._id)
        formdata.append("partner", user?._id)
        // formdata.append("isActive", userdata?.isActive); 
    } else {
        formdata.append("image", selectedImage)
        formdata.append("fullName", userdata?.fullName)
        formdata.append("contact", userdata?.contact)
        formdata.append("email", userdata?.email)
        formdata.append("password", userdata?.password)
        formdata.append("gender", userdata?.gender)
        formdata.append("pincode", userdata?.pincode)
        formdata.append("address", userdata?.address)
        formdata.append("state", userdata?.state)
        formdata.append("roleId", userdata?.roleId)
        formdata.append("planId", userdata?.planId)
        formdata.append("partnerId", user?._id)
        formdata.append("partner", user?._id)
        // formdata.append("isActive", true); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/user`
            else url = `${API_ENDPOINT}/api/create/user`
            const { status, data: { message } } = await axios.post(url, formdata, { headers })
            if (status === 200) {
                enqueueSnackbar(`${message}`, { variant: "success" });
                props.onClose();
                props.getUsers();
            }
            formdata.append("isActive", userdata?.isActive);
            localStorage.setItem('isActive', JSON.stringify(userdata?.isActive));

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
            <Dialog open={open} onClose={() => { onClose(); setUserData({});setErrors({}); }}>
                <DialogTitle>{props?.id ? "Update User" : "Add User"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} item xs={12} >
                                <Grid xs={6}>
                                    <Button size='small' color="success" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Profile
                                        <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageChange} />
                                    </Button>
                                </Grid>
                                <Grid xs={6}>
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
                                    error={!!errors.contact}
                                    helperText={errors.contact || ''}
                                    
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
                                    autoComplete={false}
                                    value={userdata?.email || ""}
                                    onChange={(e) => handleChange(e)}
                                    error={!!errors.email}
                                    helperText={errors.email || ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="password"
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    color='success'
                                    variant="outlined"
                                    autoComplete={false}
                                    value={userdata?.password || ""}
                                    onChange={(e) => handleChange(e)}
                                />
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
                                    <InputLabel id="demo-simple-select-label" color='success'>Role</InputLabel>
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
                                        {role?.map(({ _id, name }) => {
                                            return (<MenuItem value={_id}>{name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" color='success'>Plans</InputLabel>
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
                                        {plan?.map(({ _id, name }) => {
                                            return (<MenuItem value={_id}>{name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
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