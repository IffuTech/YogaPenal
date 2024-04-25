import React from "react";
import { Button, FormControlLabel, Switch, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Edit } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import NewTable from "../components/NewTable";
import axios from "axios";
import OrderDialog from "../dialogs/OrderDialog";
import { API_ENDPOINT } from "../utils/constants";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport variant="outlined" color="success" printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}

export default function Orders() {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [users, setUsers] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [params, setParams] = React.useState(null);
    const [id, setId] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const token = localStorage.getItem('token')

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
    });

    const columns = [

        { id: 'orderId', field: 'OrderId', align: 'center', minWidth: 170 },
        { id: 'courseId', field: 'Course', align: 'center', minWidth: 100 },
        {
            id: 'date',
            field: 'Date',
            minWidth: 170,
            align: 'center',
            // format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'price',
            field: 'price',
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'is_active',
            field: 'Status',
            align: 'center',
            minWidth: 170,
            renderCell: (params, id) => {
                return (<FormControlLabel sx={{ marginRight: 0 }} control={<Switch defaultChecked={params} />}
                />)
            }
        },
        {
            id: 'action',
            field: 'Action',
            align: 'center',
            minWidth: 170,
            renderCell: (params, id) => {
                console.log(params);
                return <IconButton type="button" onClick={() => { setDialogOpen(true); setParams(params); setId(id) }} aria-label="edit">
                    <Edit />
                </IconButton>
            }
        },
    ];

    const getOrders = async () => {
        const headers = { Authorization: `Bearer ${token}` };
        const { status, data: { data } } = await axios.get(`${API_ENDPOINT}/api/retrieve/orders`, { headers });
        if (status === 200 && data) {
            setSuccess(true);
            setRows(data);
        }
    }

    React.useEffect(() => {
        getOrders();
    }, []);
    return (
        <Grid>
            <Grid container>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Grid container sx={{ display: "flex", width: "100%" }}>
                        <Grid xs={12} md={2}>
                            <Typography variant={"h5"} sx={{ margin: "10px" }}>Orders</Typography>
                        </Grid>
                        <Grid xs={12} md={4} sx={{ margin: "10px" }}>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search Orders"
                                    onChange={(searchVal) => setUsers(searchVal?.target.value)}
                                    inputProps={{ 'aria-label': 'search orders' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
                            <Grid sx={{ marginLeft: "10px", marginRight: "5px" }}>
                                Start Date<TextField
                                    fullWidth
                                    size="small"
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid sx={{ marginRight: "15px" }}>
                                End Date <TextField
                                    fullWidth
                                    size="small"
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        {/* <Grid xs={12} md={2}>
                            <Button sx={{ margin: "10px" }} color="success" variant="contained">Export</Button>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ overflow: "auto", marginTop: "15px" }}>
                    {/* <NewTable columns={columns} rows={rows} success={success} queryString={users} /> */}
                    <Paper sx={{ p: "5px", display: 'flex', flexDirection: 'column' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <OrderDialog open={dialogOpen} getUsers={getOrders} params={params} id={id} onClose={() => setDialogOpen(false)} />
        </Grid>
    );
}