import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FrameImage from '../images/Frame.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import { useSnackbar} from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Nexprism
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function LoginPage(props) {
    const navigate = useNavigate();
    const [credential, setCredential] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredential({
            ...credential,
            [name]: value
        })
    }
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { status, data: { message, data: { token, user } } } = await axios.post(`${API_ENDPOINT}/api/create/login`, credential)
            if (status === 200 && token) {
                localStorage.setItem("token", `${token}`);
                localStorage.setItem("user", `${JSON.stringify(user)}`);
                localStorage.setItem("c", 2)
                setLoading(false);
                navigate("/dashboard");
                enqueueSnackbar(message, { variant: "success" });
            } else {
                enqueueSnackbar(message, { variant: "error" });
                setLoading(false);
            }
        } catch (e) {
            console.log(e)
            setLoading(false);
            enqueueSnackbar(e?.response?.data?.message, { variant: "error" });
        }

    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            size='small'
                            required
                            fullWidth
                            id="contact"
                            label="Contact Number"
                            name="contact"
                            color='success'
                            autoComplete="number"
                            onChange={(e) => handleChange(e)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            size='small'
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            color='success'
                            onChange={(e) => handleChange(e)}
                            autoComplete="current-password"
                        />
                        {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button> */}
                        <Box sx={{ position: 'relative' }}>
                            <Button
                                type="submit"
                                fullWidth
                                color='success'
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}