import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';
import { Button, IconButton, styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const useStyles = styled((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function AppSetting() {
    // const { open, onClose } = props;
    const classes = useStyles();
    const token = localStorage.getItem('token')
    const [userdata, setUserData] = React.useState({});
    const user = JSON.parse(localStorage.getItem("user"))
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageURL, setImageURL] = React.useState('');
    const [role, setRole] = React.useState([])
    const [plan, setPlan] = React.useState([])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            // const imageUrl = URL.createObjectURL(file);
            // setImageURL(imageUrl);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userdata,
            [name]: value
        })
    }
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
      
    //     // Handle the password separately
    //     if (name === 'password') {
    //       setUserData((prevUserData) => ({
    //         ...prevUserData,
    //         [name]: value,
    //       }));
    //     } else {
    //       setUserData((prevUserData) => ({
    //         ...prevUserData,
    //         [name]: prevUserData[name] === 'password' ? value : prevUserData[name],
    //       }));
    //     }
    //   };
    const getRoles = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/roles`, { headers });
        if (status === 200) {
            // setSuccess(true);
            setRole(data);
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

    const formdata = new FormData();
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

    console.log(userdata, "pppppppppppppppp");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
        try {
            const { status, data: { message } } = await axios.post(`${API_ENDPOINT}/api/update/user`, formdata, { headers })
            if (status === 200)
                enqueueSnackbar(`${message}`, { variant: "success" });
            // props.onClose();
            // props.getUsers();
        } catch (e) {
            enqueueSnackbar(`${e?.response?.data?.message}`, { variant: "error" });
        }
    }


    React.useEffect(() => {
        user?._id && setUserData(user)
    }, [user?._id])
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" style={{ marginTop: "5px", paddingBottom: "10px" }} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Box component="form" onSubmit={handleSubmit} >
                    <Grid sx={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        {userdata?.image ? <Avatar
                            alt="Remy Sharp"
                            src={`${API_ENDPOINT}/userImages/${userdata?.image}`}
                            sx={{ width: 56, height: 56 }}
                        /> :
                            <Grid>
                                <input accept="image/*" style={{ display: "none" }} name='image' onChange={(e) => handleImageChange(e)} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="success" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Grid>
                        }
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="fullName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                                color="success"
                                size='small'
                                value={userdata?.fullName || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                color="success"
                                value={userdata?.email || ""}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                autoComplete="email"
                                variant="outlined"
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="contact"
                                name="contact"
                                label="Phone Number"
                                fullWidth
                                autoComplete="contact"
                                variant="outlined"
                                color="success"
                                size='small'
                                onWheel={(e) => e.target.blur()}
                                value={userdata?.contact || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                fullWidth
                                autoComplete="password"
                                variant="outlined"
                                color="success"
                                type='text'
                                size='small'
                                onWheel={(e) => e.target.blur()}
                                value={userdata?.password || ""}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" color="success">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    size='small'
                                    required
                                    name='roleId'
                                    value={userdata?.roleId || ""}
                                    label="Role"
                                    variant="outlined"
                                    color="success"
                                    onChange={(e) => handleChange(e)}
                                >
                                    {role?.map(({ _id, name }) => {
                                        return (<MenuItem value={_id}>{name}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" color="success">Plans</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant="outlined"
                                    size='small'
                                    // required
                                    name='planId'
                                    color="success"
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
                        <Grid item xs={6} sm={6}>
                            <TextField
                                id="gender"
                                name="gender"
                                label="Gender"
                                fullWidth
                                variant="outlined"
                                color="success"
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                fullWidth
                                variant="outlined"
                                color="success"
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                variant="outlined"
                                color="success"
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="outlined"
                                color="success"
                                size='small'
                            />
                        </Grid>
                    </Grid>
                    <Button variant='contained' color='success' type="submit" style={{ marginTop: "15px" }}> Update </Button>
                </Box>
            </Paper>
        </Container>
    );
}