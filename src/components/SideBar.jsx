import * as React from 'react';
import {
    Box,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import {
    Person2,
    Book,
    LiveTv,
    AutoAwesomeMosaic,
    Quiz,
    ManageAccounts,
    Logout,
    Spa,
    ChildFriendly,
    Handshake,
    PsychologyAlt,
    CurrencyRupee,
    AdminPanelSettings,
    ViewCarousel,
    School,
    Category,
    LocalOffer,
    FlagCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import { enqueueSnackbar } from 'notistack';
import logo from "../images/yoga_logo.png"
import Divider from '@mui/material/Divider';

export default function SideBar(props) {
    const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem("user"))
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [selectedRow, setSelectedRow] = React.useState();
    const token = localStorage.getItem("token")

    const handleSubmit = async () => {
        try {
            const headers = {
                headers: {
                    'Content-Type': 'application/json', // You can set other headers as needed
                    'Authorization': `Bearer ${token}`,
                } // For example, an authorization header
            };
            const { status, data: { message } } = await axios.delete(`${API_ENDPOINT}/api/delete/logout`, { headers, data: { userId: user?._id } });

            // const { status, data: { message } } = await axios.delete(`${API_ENDPOINT}/api/delete/logout`, { userId: user?._id }, headers)
            if (status === 200) {
                localStorage.clear();
                navigate('/loginPage')
                enqueueSnackbar(message, { variant: "success" });
            } else {
                enqueueSnackbar(message, { variant: "error" });
            }
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e?.response?.data?.message, { variant: "error" });
        }

    };

    React.useEffect(() => {
        localStorage.getItem('active') && setSelectedRow(localStorage.getItem("active") || "Dashboard")
    }, [])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 225 }}
            // role="presentation"
        >
            {user?.role.name === "admin" ?
                <List>
                    {[
                        { icon: <AutoAwesomeMosaic sx={{ color: "green" }} />, name: 'Dashboard' },
                        { icon: <Person2 sx={{ color: "green" }} />, name: 'Users' },
                        { icon: <Book sx={{ color: "green" }} />, name: 'Blogs' },
                        { icon: <Category sx={{ color: "green" }} />, name: 'Category' },
                        { icon: <LocalOffer sx={{ color: "green" }} />, name: 'DealsAndOffers' },
                        { icon: <LiveTv sx={{ color: "green" }} />, name: 'LiveClass' },
                        { icon: <Spa sx={{ color: "green" }} />, name: 'Courses' },
                        { icon: <ChildFriendly sx={{ color: "green" }} />, name: 'Orders' },
                        { icon: <FlagCircle sx={{ color: "green" }} />, name: 'Goal' },
                        { icon: <Handshake sx={{ color: "green" }} />, name: 'Tutors' },
                        { icon: <Quiz sx={{ color: "green" }} />, name: 'Testimonials' },
                        { icon: <PsychologyAlt sx={{ color: "green" }} />, name: 'Faq' },
                        { icon: <CurrencyRupee sx={{ color: "green" }} />, name: 'Plan' },
                        { icon: <AdminPanelSettings sx={{ color: "green" }} />, name: 'Role' },
                        { icon: <ViewCarousel sx={{ color: "green" }} />, name: 'Banner' },
                        { icon: <School sx={{ color: "green" }} />, name: 'Demo' },
                        { icon: <ManageAccounts sx={{ color: "green" }} />, name: 'Settings' }
                    ].map((text, index) => (
                        <ListItem key={index} style={{ padding: "0" }} >
                            <ListItemButton sx={{ color: selectedRow === `${text?.name}` ? "success" : "inherit", backgroundColor: selectedRow === `${text?.name}` ? "success" : "inherit" }}
                                style={{}}
                                onClick={() => {
                                    props?.onClose(null, null);
                                    setSelectedRow(text?.name);
                                    text?.name && navigate(`/${text.name.toLowerCase()}`);
                                    // navigate(`/${text?.name?.toLowerCase()}`)
                                }}>
                                <ListItemIcon>
                                    {text?.icon}
                                </ListItemIcon>
                                <ListItemText primary={text?.name} />
                            </ListItemButton>
                        </ListItem>

                    ))}
                    <ListItem style={{ padding: "0" }} color={selectedRow === "Logout" ? "success" : "inherit"} onClick={() => { props?.onClose(null, null); setSelectedRow("Logout"); handleSubmit() }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Logout sx={{ color: "green" }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List> : user?.role.name=== "tutor" ?
                    <List>
                        {[
                            { icon: <AutoAwesomeMosaic sx={{ color: "green" }} />, name: 'Dashboard' },
                            // { icon: <Person2 sx={{ color: "green" }} />, name: 'Users' },
                            // { icon: <Book sx={{ color: "green" }} />, name: 'Blogs' },
                            // { icon: <Category sx={{ color: "green" }} />, name: 'Category' },
                            // { icon: <LocalOffer sx={{ color: "green" }} />, name: 'DealsAndOffers' },
                            { icon: <LiveTv sx={{ color: "green" }} />, name: 'LiveClass' },
                            { icon: <Spa sx={{ color: "green" }} />, name: 'Courses' },
                            // { icon: <ChildFriendly sx={{ color: "green" }} />, name: 'Orders' },
                            // { icon: <FlagCircle sx={{ color: "green" }} />, name: 'Goal' },
                            // { icon: <Quiz sx={{ color: "green" }} />, name: 'Testimonials' },
                            // { icon: <Handshake sx={{ color: "green" }} />, name: 'Tutors' },
                            // { icon: <PsychologyAlt sx={{ color: "green" }} />, name: 'Faq' },
                            // { icon: <CurrencyRupee sx={{ color: "green" }} />, name: 'Plan' },
                            // { icon: <AdminPanelSettings sx={{ color: "green" }} />, name: 'Role' },
                            // { icon: <School sx={{ color: "green" }} />, name: 'Demo' },
                            // { icon: <ViewCarousel sx={{ color: "green" }} />, name: 'Banner' },
                            { icon: <ManageAccounts sx={{ color: "green" }} />, name: 'Settings' }
                        ]
                        .map((text, index) => (
                            <ListItem key={index} style={{ padding: "0" }}>
                                <ListItemButton onClick={() => {
                                    props?.onClose(null, null);
                                    navigate(`/${text?.name?.toLowerCase()}`)
                                }}>
                                    <ListItemIcon>
                                        {text?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text?.name} />
                                </ListItemButton>
                            </ListItem>

                        ))}
                        <ListItem style={{ padding: "0" }} onClick={() => { props?.onClose(null, null); handleSubmit() }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Logout sx={{ color: "green" }} />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </List> : null
            }
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor={"left"}
                    {...props}
                >
                    <Grid sx={{ padding: "8px" }} >
                        {/* <img src={logo} alt='' width="240px" /> */}
                        <Typography variant='h4' sx={{ color: "green", fontFamily: "cursive", fontWeight: "500" }}>
                            Namasteyog
                        </Typography>
                    </Grid>
                    <Divider />
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}