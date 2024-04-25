import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid } from '@mui/material';

export default function FilterDialog(props) {
    const { open, onClose } = props;
    const token = localStorage.getItem('token')
    const [blogdata, setBlogData] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogdata,
            [name]: value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
       props?.setFilter(blogdata)
    }

    return (
        <div>
            <Dialog open={open} onClose={() => { setBlogData({}); onClose(); }}>
                <DialogTitle>Filter</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="state"
                                    name="state"
                                    label="State"
                                    color='success'
                                    value={blogdata?.state || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="gender"
                                    name="gender"
                                    label="Gender"
                                    color='success'
                                    value={blogdata?.gender || ""}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="success" onClick={() => {setBlogData({}); onClose(); }}>Cancel</Button>
                        <Button variant='contained' color="success" type="submit">Apply</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}