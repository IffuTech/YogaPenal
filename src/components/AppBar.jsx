import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MenuOpen } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SideBar from "./SideBar";
import Grid from "@mui/material/Grid";
import { Link, Outlet } from 'react-router-dom'
import Drawer from "@mui/material/Drawer";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import { enqueueSnackbar } from 'notistack';
import logo from "../images/yoga_logo.png"
import { ButtonBase } from '@mui/material';

export default function NewAppBar() {
    const [showDraw, setShowDraw] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")

    const handleSubmit = async () => {
        try {
            const headers = {
                headers: {
                    'Content-Type': 'application/json', // You can set other headers as needed
                    'Authorization': `Bearer ${token}`,
                } // For example, an authorization header
            };
            const { status, data: { message } } = await axios.delete(`${API_ENDPOINT}/api/delete/logout`, { userId: user?._id }, headers)
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

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => { handleMenuClose(); navigate("/settings") }}>Profile</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); handleSubmit() }}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    React.useEffect(() => {
        localStorage.getItem('c') && setSelectedRow(localStorage.getItem("c") || "2")
    }, [])

    return (
        <Grid sx={{ flexGrow: 1 }}>
            <AppBar color='success' position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        backgroundColor=""
                        sx={{ mr: 2 }}
                        onClick={() => setShowDraw(true)}
                    >
                        <MenuOpen />
                    </IconButton>
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                    <Grid >
                        <Typography variant='h4' sx={{fontFamily:"cursive"}}>
                            Namasteyog
                        </Typography>
                    </Grid>
                    <Grid container sx={{ display: { xs: 'none', md: 'flex', lg: "flex" }, justifyContent: "flex-end", alignItems: "center" }}>
                        <Grid item>
                            {/*<Link to="/dashboard" style={{color: "#fff", textDecoration:"none"}} onClick={()=>setSelectedRow("1")}>*/}
                            {/*    <IconButton sx={{marginRight: "75px"}} size="small" color={selectedRow === "1"?"#000":"inherit"}>*/}
                            {/*        Dashboard*/}
                            {/*    </IconButton>*/}
                            {/*</Link>*/}
                            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}
                                onClick={() => setSelectedRow("2")}>
                                <Button sx={{ marginRight: "40px" }} variant='contained' size="small"
                                    color={selectedRow === "2" ? "success" : "primary"}
                                    onClick={() => localStorage.setItem("c", "2")}
                                >
                                    Dashboard
                                </Button>
                            </Link>
                            <Link to="/users" style={{ color: "#fff", textDecoration: "none" }}
                                onClick={() => setSelectedRow("3")}>
                                <Button sx={{ marginRight: "40px" }} variant='contained' size="small"
                                    color={selectedRow === "3" ? "success" : "primary"}
                                    onClick={() => localStorage.setItem("c", "3")}
                                >
                                    Users
                                </Button>
                            </Link>
                            <Link to="/liveclass" style={{ color: "#fff", textDecoration: "none" }}
                                onClick={() => setSelectedRow("4")}>
                                <Button sx={{ marginRight: "40px" }} variant='contained' size="small"
                                    color={selectedRow === "4" ? "success" : "primary"}
                                    onClick={() => localStorage.setItem("c", "4")}
                                >
                                    LiveClasses
                                </Button>
                            </Link>
                            <Link to="/orders" style={{ color: "#fff", textDecoration: "none" }}
                                onClick={() => setSelectedRow("5")}>
                                <Button sx={{ marginRight: "40px" }} variant='contained' size="small"
                                    color={selectedRow === "5" ? "success" : "primary"}
                                    onClick={() => localStorage.setItem("c", "5")}
                                >
                                    Orders
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <SideBar
                open={showDraw}
                onClose={() => setShowDraw(false)}
            />
            <Outlet />
        </Grid>
    );
}