import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';
import NewTable from '../components/NewTable';
import { Button, FormControlLabel, Switch, Grid, TextField } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import IconButton from "@mui/material/IconButton";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport variant="outlined" color="success" printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 4,
    maxColumns: 6,
  });
  const toggleDrawer = () => {
    setOpen(!open);
  };
const userRole = "admin"


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
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'is_active',
      field: 'Status',
      align: 'center',
      minWidth: 170,
      // renderCell: (params, id) => {
      //   return (<FormControlLabel sx={{ marginRight: 0 }} control={<Switch defaultChecked={params} />}
      //   />)
      // }
    },
    {
      id: 'action',
      field: 'Action',
      align: 'center',
      minWidth: 170,
      // renderCell: (params, id) => {
      //   console.log(params);
      //   return <IconButton type="button" aria-label="edit">
      //     <Edit />
      //   </IconButton>
      // }
    },
  ];
  const isAdmin = userRole === 'admin';
  const isTutor = userRole === 'tutor';



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '89vh',
          overflow: 'auto',
          color: "success.main"
        }}

        
      >
       
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            {isAdmin && ! isTutor &&(
              <>
              <Grid item xs={12} md={8} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
       
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Deposits title="Users" number="20" />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Deposits title="Tutors" number="05" />
              </Paper>
            </Grid>
       
            <Grid item xs={12}>
              <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                <DataGrid
                  columns={columns}
                  rows={[]}
                  loading={loading}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                />
              </Paper>
            </Grid>
              </>
            )}
            
 {/* visible for only tutors */}
         {isTutor && ! isAdmin  &&(

              <>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits title="Courses" number="10" />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits title="Faq" number="15" />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits title="LiveClases" number="6" />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Deposits title="Category" number="20" />
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}