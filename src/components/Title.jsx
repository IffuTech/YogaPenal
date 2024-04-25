import * as React from 'react';
import Typography from '@mui/material/Typography';


export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="success" gutterBottom>
      {props.children}
    </Typography>
  );
}