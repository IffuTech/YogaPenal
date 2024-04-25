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
import { Add, Close, Delete } from '@mui/icons-material';
import { Box, Grid, Chip } from '@mui/material';
import { API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import { enqueueSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

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

const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong> {valueType}
        </span>
    );

    if (isProOnly) {
        return (
            <Stack direction="row" spacing={0.5} component="span">
                <Tooltip title="Included on Pro package">
                    <a href="https://mui.com/x/introduction/licensing/#pro-plan">
                        <ProSpan />
                    </a>
                </Tooltip>
                {content}
            </Stack>
        );
    }

    return content;
}

export default function CourseDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    const [userdata, setUserData] = React.useState({});
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageURL, setImageURL] = React.useState('');
    const [categories, setCategories] = React.useState();
    const [dateType, setDateType] = React.useState('');
    const [tutor, setTutors] = React.useState();
    const [value1, setValue1] = React.useState();
    const [value2, setValue2] = React.useState();
    const [time, setTime] = React.useState([]);
    // console.log(time, "time");
    // console.log(value1, value2);
    const handleDateTypeChange = (event) => {
        setDateType(event.target.value);
    };

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

    const formdata = new FormData()
    if (props?.id) {
        formdata.append("image", selectedImage)
        formdata.append("_id", userdata?._id)
        formdata.append("name", userdata?.name)
        formdata.append("price", userdata?.price)
        formdata.append("duration", JSON.stringify(time))
        formdata.append("description", userdata?.description)
        formdata.append("category", userdata?.categoryId)
        formdata.append("priorityNo", userdata?.priorityNo)
        formdata.append("user", user?._id)
        formdata.append("tutorId", userdata?.tutorId)
    } else {
        formdata.append("image", selectedImage)
        formdata.append("name", userdata?.name)
        formdata.append("price", userdata?.price)
        formdata.append("duration", JSON.stringify(time))
        formdata.append("description", userdata?.description)
        formdata.append("category", userdata?.categoryId)
        formdata.append("priorityNo", userdata?.priorityNo)
        formdata.append("user", user?._id)
        formdata.append("tutorId", userdata?.tutorId)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = { Authorization: `Bearer ${token}` };
        try {
            let url;
            if (props?.id) url = `${API_ENDPOINT}/api/update/course`
            else url = `${API_ENDPOINT}/api/create/course`
            const { status, data: { message } } = await axios.post(url, formdata, { headers })
            if (status === 200)
                enqueueSnackbar(`${message}`, { variant: "success" });
            props.onClose();
            props.getUsers();
        } catch (e) {
            enqueueSnackbar(`${e?.response?.data?.message}`, { variant: "error" });
        }
    }

    const getCategories = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/categories`, { headers });
        if (status === 200) {
            setCategories(data);
        }
    }
    const getTutors = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/partners`, { headers });
        if (status === 200) {
            setTutors(data);
        }
    }
   const startTime = new Date(value1)
   const endTime = new Date(value2)
    const timePicker = () => {
        setTime([
            ...time, { ["time"]: `${startTime.getHours()}:${startTime.getMinutes()} : ${endTime.getHours()}:${endTime.getMinutes()}` }
        ])

        setValue1('')
        setValue2('')
    }

    const deleteTime = index => {
        setTime(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
    }

    React.useEffect(() => {
        getTutors();
        getCategories();
    }, []);

    React.useEffect(() => {
        if (props.id) {
            setUserData(props.params)
            setTime(props?.params?.duration)
        } else {
            setUserData({})
        }
    }, [props.params])

    return (
        <div>
            <Dialog open={open} onClose={() => { onClose(); setUserData({}); setValue1(''); setValue2(''); setTime([]); props.setParams({}) }}>
                <DialogTitle>{props?.id ? "Update Course" : "Add Course"}</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid sx={{ display: "flex", justifyContent: "center", alignContent: "center" }} item xs={12} >
                                <Grid xs={8}>
                                    <Button size='small' color="success" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload Coures Banner
                                        <VisuallyHiddenInput type="file" accept='image/*' onChange={handleImageChange} />
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
                                    id="name"
                                    required
                                    name="name"
                                    label="Name"
                                    color='success'
                                    value={userdata?.name || ""}
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
                                    variant="outlined"
                                    color='success'
                                    value={userdata?.price || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" color="success">Duration</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            size='small'
                                            required
                                            name='duration'
                                            color='success'
                                            value={time || ""}
                                            label="Duration"
                                            // onChange={(e) => handleChange(e)}
                                            renderValue={(time) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {time.map((value) => (
                                                        <Chip key={value?.time} label={value?.time} />
                                                    ))}
                                                </Box>
                                            )}
                                        >
                                            {
                                               !!time && time?.map((value, i) => {
                                                    return (<MenuItem value={i} sx={{ display: "flex", justifyContent: "space-between" }}> {value?.time} <Delete onClick={() => deleteTime(i)} /></MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Grid item xs={5}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer
                                                    components={['TimePicker',]}
                                                >
                                                    <DemoItem label={<Label componentName="Start" valueType="Time" size="small" />}>
                                                        <TimePicker
                                                            value={value1}
                                                            onChange={(newTime) => setValue1(new Date(newTime).toString("HH:mm"))}
                                                        />
                                                    </DemoItem>
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer
                                                    components={['TimePicker',]}

                                                >
                                                    <DemoItem label={<Label componentName="End" valueType="Time" size="small" />}>
                                                        <TimePicker
                                                            value={value2}
                                                            onChange={(newTime) => setValue2(new Date(newTime).toString("HH:mm"))}
                                                        />
                                                    </DemoItem>
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Button color="success" disabled={!(value1 && value2)} onClick={timePicker} variant='contained' startIcon={<Add />} >Add</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="description"
                                    required
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    color='success'
                                    value={userdata?.description || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="category-simple-select-label" color="success">Category</InputLabel>
                                    <Select
                                        labelId="category-simple-select-label"
                                        id="category-simple-select"
                                        size='small'
                                        required
                                        name='categoryId'
                                        color='success'
                                        value={userdata?.categoryId || ""}
                                        label="Category"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {categories?.map((cat) => {
                                            return (<MenuItem value={`${cat?._id}`}>{`${cat?.name}`}</MenuItem>)
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="tutorId-simple-select-label" color="success">Tutor</InputLabel>
                                    <Select
                                        labelId="tutorId-simple-select-label"
                                        id="tutorId-simple-select"
                                        size='small'
                                        required
                                        name='tutorId'
                                        color='success'
                                        value={userdata?.tutorId || ""}
                                        label="Tutor"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {tutor?.map(({ _id, fullName }) => {
                                            return (<MenuItem value={_id}>{fullName}</MenuItem>)
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => { onClose(); setUserData({}); setValue1(''); setValue2(''); setTime([]); props.setParams({}) }}>Cancel</Button>
                        <Button variant='contained' color="success" type="submit">{props?.id ? "Update" : "Add"}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}