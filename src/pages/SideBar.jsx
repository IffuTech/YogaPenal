import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Recruiter from '../images/recruiter.svg'
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';


export default function SideBar(props) {


    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
        >
            <List>
                {[{icon: <DashboardIcon sx={{color: "#000000"}}/>, name: 'Dashboard'}, {
                    icon: <PersonAddIcon sx={{color: "#000000"}}/>, name: 'Candidates'
                }, {icon: <img src={Recruiter}/>, name: 'Recruiter'}, {
                    icon: <WorkIcon sx={{color: "#000000"}}/>,
                    name: 'Jobs'
                }, {icon: <LogoutIcon sx={{color: "#000000"}}/>, name: 'Logout'}].map((text, index) => (
                    <ListItem key={text} disablePadding >
                        <ListItemButton onClick={()=> props?.onClose(null,null)}>
                            <ListItemIcon>
                                {text?.icon}
                            </ListItemIcon>
                            <ListItemText primary={text?.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer
                    anchor={"left"}
                    {...props}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}