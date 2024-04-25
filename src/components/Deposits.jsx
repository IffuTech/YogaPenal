import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Button, Grid } from '@mui/material';


export default function Deposits(props) {
  return (
    <React.Fragment>
      <Grid >
        <Title>{props?.title}</Title>
        <Typography component="p" variant="h4" sx={{ marginTop: "40px" }}>
          {props?.number}
        </Typography>
        <Button color='success' variant='outlined' sx={{ marginTop: "40px" }}>
          <Link color="inherit" to={`/${props?.title?.toLowerCase()}`} style={{ color:"green", textDecoration:"none" }}>
            View {props?.title}
          </Link>
        </Button>
      </Grid>
    </React.Fragment>
  );
}