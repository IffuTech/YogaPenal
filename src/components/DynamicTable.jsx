// import React, {useState} from "react";
// import {
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TablePagination,
//     TableRow,
//     Button,
//     Grid, IconButton, Avatar, Switch, Tooltip
// } from "@mui/material";
// import {Modal} from "./Modal"
// import {Edit, MoreVert, Add, ReceiptLong} from "@mui/icons-material";
// import {Student, User, Batch, Trainer, Certificate, Placement} from "./forms";
// import {Internship} from "../dialogs";
// import moment from "moment";
// import {stringAvatar} from "../helper/functions";
// import {ASSETS_URL} from "../constants";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";

// const columns = {
//     students: [
//         {id: "registration_number", label: "REG-NO."},
//         {id: "name", label: "Name"},
//         {id: "father_name", label: "Father's Name"},
//         {id: "mobile_number", label: "Phone Number"},
//         // {id: "whatsapp_number", label: "Whatsapp Number"},
//         {id: "email", label: "email"},
//         {id: "date_of_birth", label: "DOB"},
//         // {id: "state", label: "State"},
//         {id: "city", label: "City"},
//         // {id: "pincode", label: "Pincode"},
//         {id: "present_address", label: "Present Address"},
//         // {id: "permanent_address", label: "Permanent Address"},
//         // {id: "degree_id", label: "Degree"},
//         // {id: "college_id", label: "College"},
//         // {id: "university_id", label: "University"},
//         // {id: "year_of_passing", label: "Year of Passing"},
//         {
//             id: "action",
//             label: "Action",
//             renderCell: ({row, onEditClick, menuProps: {open, onClick}}) => {
//                 return (
//                     <React.Fragment>
//                         <IconButton onClick={() => onEditClick(row.id)}>
//                             <Edit/>
//                         </IconButton>
//                         <IconButton
//                             onClick={(e) => {
//                                 onClick(e, row.id)
//                             }}
//                             size="small"
//                             sx={{ml: 2}}
//                             aria-controls={open ? 'account-menu' : undefined}
//                             aria-haspopup="true"
//                             aria-expanded={open ? 'true' : undefined}
//                         >
//                             <MoreVert/>
//                         </IconButton>
//                     </React.Fragment>
//                 );
//             },
//         },
//     ],
//     users: [
//         {id: 'role', label: 'Role', renderCell: ({row}) => row.role.name},
//         {id: 'branch_id', label: 'Branch',},
//         {id: 'gender_id', label: 'Gender',},
//         {id: 'name', label: 'Name',},
//         {id: 'email', label: 'Email ',},
//         {id: 'pincode', label: 'Pincode',},
//         {id: 'address', label: 'Address',},
//         {id: 'city', label: 'City',},
//         {id: 'state', label: 'State',},
//         {id: 'date_of_birth', label: 'Date of Birth',},
//         {
//             id: "action",
//             label: "Action",
//             renderCell: ({row, onEditClick}) => {
//                 return (
//                     <IconButton onClick={() => onEditClick(row?.id)}>
//                         <Edit/>
//                     </IconButton>

//                 );
//             },
//         },
//     ],
//     trainers: [
//         {
//             id: "profile", label: "Profile", renderCell: ({row}) => <Tooltip title={row?.name} placement="top-end">
//                 {row?.name ? <Avatar
//                     {...stringAvatar(row?.name)}
//                     src={ASSETS_URL + `/profile/${row?.profile}`}
//                     alt={row?.name}
//                 /> : <Avatar/>}
//             </Tooltip>
//         },
//         {id: 'name', label: 'Name',},
//         {id: 'email', label: 'Email ',},
//         {id: 'gender', label: 'Gender',},
//         {id: 'pincode', label: 'Pincode',},
//         {id: 'address', label: 'Address',},
//         {id: 'city', label: 'City',},
//         {id: 'state', label: 'State',},
//         {id: 'type', label: 'Type',},
//         {
//             id: 'joining_date',
//             label: 'Date of Joining',
//             renderCell: ({row}) => row.joining_date ? moment(row.joining_date).format("DD-MM-YYYY") : "N/A"
//         },
//         {
//             id: 'created_by',
//             label: 'Created By',
//             renderCell: ({row}) => <Tooltip title={row?.created_by.name} placement="top-end">
//                 {row?.created_by.name ? <Avatar
//                     {...stringAvatar(row?.created_by.name)}
//                     src={ASSETS_URL + `/profile/${row?.created_by.profile}`}
//                     alt={row?.created_by.name}
//                 /> : <Avatar/>}
//             </Tooltip>
//         },
//         {
//             id: "action",
//             label: "Action",
//             renderCell: ({row, onEditClick}) => {
//                 return (
//                     <IconButton onClick={() => onEditClick(row?.id)}>
//                         <Edit/>
//                     </IconButton>

//                 );
//             },
//         },
//     ],
//     batches: [
//         {id: 'name', label: 'Name',},
//         {
//             id: 'start_date',
//             label: 'Start Date',
//             renderCell: (row) => row.start_date ? moment(row.start_date).format("DD-MMM-YYYY") : "N/A"
//         },
//         {id: 'duration', label: 'Duration (Months)',},
//         {
//             id: 'trainer',
//             label: 'Trainer',
//             renderCell: (row) => <Tooltip title={row?.trainer?.name} placement="top-end">
//                 {row?.trainer?.name ? <Avatar
//                     {...stringAvatar(row?.trainer?.name)}
//                     src={ASSETS_URL + `/profile/${row?.trainer?.profile}`}
//                     alt={row?.trainer?.name}
//                 /> : <Avatar/>}
//             </Tooltip>
//         },
//         {
//             id: 'batch_time',
//             label: 'Batch Time ',
//             renderCell: (row) => row?.start_time && row?.end_time ? `${row.start_time} To ${row.end_time}` : "N/A"
//         },
//         {
//             id: "action",
//             label: "Action",
//             renderCell: ({row, onEditClick}) => {
//                 return (<React.Fragment>
//                         <IconButton onClick={() => onEditClick(row?.id)}>
//                             <Edit/>
//                         </IconButton>
//                     </React.Fragment>
//                 );
//             },
//         },

//     ],
//     thirdPartyClients: [],
//     rolesAndPermissions: [
//         {
//             id: "name",
//             label: "Name"
//         }, {
//             id: "user_id",
//             label: "Created By"
//         }, {
//             id: "action",
//             label: "Action",
//             renderCell: ({row}) => {
//                 return (
//                     <React.Fragment>
//                         <IconButton>
//                             <Edit/>
//                         </IconButton>
//                         <Tooltip style={{cursor: "pointer"}} title="Status">
//                             <Switch checked={row?.is_active} size="small" color="primary"/>
//                         </Tooltip>
//                     </React.Fragment>
//                 );
//             },
//         },
//     ],
//     // certificates:[
//     //     {id:""}
//     // ]
//     internships: [
//         {id: "letter_number", label: "Letter Number"},
//         {id: "issued_by", label: "Issued By"},
//         {
//             id: "project_name", label: "Projects", renderCell: ({row}) => {
//                 // const projects= JSON.parse(row.project_name)
//                 return (
//                     row.project_name
//                 )
//             }
//         },
//         {id: "start_date", label: "Start Date"},
//         {id: "end_date", label: "End Date"},
//         {id: "guide", label: "Guide"},
//         {id: "user_id", label: "Created By"},
//     ]
// };

// const models = {
//     students: (args) => <Student {...args}/>,
//     users: (args) => <User {...args}/>,
//     batches: (args) => <Batch {...args}/>,
//     trainers: (args) => <Trainer {...args} />,
//     certificates: (args) => <Certificate {...args}/>,
//     internships: (args) => <Internship {...args} />,
//     placements: (args) => <Placement {...args} />
// }

// export default function DynamicTable(props) {
//     const {rows, type, url, paginationProps: {limit, page, setLimit, setPage, total}} = props;
//     const [open, setOpen] = useState(false);
//     const [modelType, setModelType] = useState(null);
//     const [modelUrl, setModelUrl] = useState(null);
//     const [id, setId] = useState(null);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const openMenu = Boolean(anchorEl);
//     const handleClickMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleCloseMenu = () => {
//         setAnchorEl(null);
//     };
//     const handleClickOpen = (type,url) => {
//         setModelUrl(url);
//         setModelType(type);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setModelType(null);
//         setModelUrl(null);
//         setId(null);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeLimit = (event) => {
//         setLimit(+event.target.value);
//         setPage(0);
//     };

//     return (
//         <Grid container p={2} maxWidth={"100vw"}>
//             <Grid item xs={12} mb={2}>
//                 <Button
//                     variant="contained"
//                     size="small"
//                     onClick={()=>{
//                         handleClickOpen(type,url)
//                     }}
//                     startIcon={<Add/>}
//                 >
//                     ADD
//                 </Button>
//                 {modelType && <Modal open={open} onClose={handleClose}>
//                     {models[modelType]({id, url: modelUrl, handleClose})}
//                 </Modal>}
//             </Grid>
//             <Grid item xs={12}>
//                 <Paper sx={{
//                     width: "100%",
//                     boxShadow: (theme) => theme.shadows[5],
//                 }}>
//                     <TableContainer
//                         sx={{
//                             maxWidth: "100vw",
//                             maxHeight: "calc(100vh - 240px)"
//                         }}
//                     >
//                         <Table stickyHeader aria-label="sticky table">
//                             <TableHead>
//                                 <TableRow>
//                                     {columns[type]?.map((column) => (
//                                         <TableCell key={column.id} align={column.align}>
//                                             {column.label}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {rows?.map((row) => {
//                                     return (
//                                         <TableRow
//                                             hover
//                                             role="checkbox"
//                                             tabIndex={-1}
//                                             key={row.id}
//                                         >
//                                             {columns[type]?.map((column) => {
//                                                 const value = row[column.id];
//                                                 return (
//                                                     <TableCell key={column.id} align={column.align}>
//                                                         {column?.renderCell
//                                                             ? column?.renderCell({
//                                                                 row, onEditClick: (id) => {
//                                                                     handleClickOpen(type,url);
//                                                                     setId(id)
//                                                                 },
//                                                                 menuProps: {
//                                                                     open: openMenu,
//                                                                     onClick: (event, id) => {
//                                                                         handleClickMenu(event)
//                                                                         setId(id)
//                                                                     }
//                                                                 }
//                                                             })
//                                                             : value}
//                                                     </TableCell>
//                                                 );
//                                             })}
//                                         </TableRow>
//                                     );
//                                 })}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[10, 25, 100]}
//                         component="div"
//                         count={total}
//                         rowsPerPage={limit}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeLimit}
//                     />
//                 </Paper>
//             </Grid>
//             <Menu
//                 anchorEl={anchorEl}
//                 id="account-menu"
//                 open={openMenu}
//                 onClose={handleCloseMenu}
//                 onClick={handleCloseMenu}
//                 PaperProps={{
//                     elevation: 0,
//                     sx: {
//                         overflow: 'visible',
//                         filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                         mt: 1.5,
//                         '& .MuiAvatar-root': {
//                             width: 32,
//                             height: 32,
//                             ml: -0.5,
//                             mr: 1,
//                         },
//                         '&:before': {
//                             content: '""',
//                             display: 'block',
//                             position: 'absolute',
//                             top: 0,
//                             right: 14,
//                             width: 10,
//                             height: 10,
//                             bgcolor: 'background.paper',
//                             transform: 'translateY(-50%) rotate(45deg)',
//                             zIndex: 0,
//                         },
//                     },
//                 }}
//                 transformOrigin={{horizontal: 'right', vertical: 'top'}}
//                 anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
//             >
//                 {
//                     props?.menuItems?.map(({type, url, icon}) => {
//                         return (
//                             <MenuItem
//                                 key={type}
//                                 onClick={() => {

//                                     handleClickOpen(type,url)
//                                 }}

//                             >
//                                 {icon}<Typography sx={{ml:1}} component="span">{type.toUpperCase()}</Typography>
//                             </MenuItem>
//                         )
//                     })
//                 }
//             </Menu>
//         </Grid>
//     );
// }
