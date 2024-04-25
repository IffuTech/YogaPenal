import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

export default function NewTable({ rows, columns, onClick, is_job, success, queryString }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleSelect = (event, row) => {
        setSelectedRow(row);
    };

    return (
        <Paper elevation={6} sx={{ p: "10px", width: '100%', overflow: 'hidden', borderRadius: "0" }}>
            <TableContainer sx={{
                maxWidth: "100vw",
                maxHeight: "calc(100vh - 240px)"
            }}>
                <Table stickyHeader aria-label="sticky table" size="small" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ textAlign: "center" }}>
                        {success ? (rows?.length >= 1 ? rows
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter((row) => row?.fullName?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.email?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.contact?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.qa?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.title?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                // row?.priorityNo?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.state?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.gender?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.pincode?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.video?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.name?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.image?.toLowerCase().includes(queryString?.toLowerCase()) ||
                                row?.content?.toLowerCase().includes(queryString?.toLowerCase())
                            ).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}
                                        selected={selectedRow === row}
                                        onClick={(event) => handleSelect(event, row)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : column.renderCell ? column.renderCell(row, row?.id) ? column.renderCell(row, row?.id) : "N/A" : value ?? "N/A"}

                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }) : <TableRow hover role="checkbox" tabIndex={-1}><TableCell colSpan={columns?.length}>
                                <Typography variant="h6" sx={{ textAlign: "center" }}>No Record
                                    Found</Typography></TableCell></TableRow>) :
                            <TableRow hover role="checkbox" tabIndex={-1}><TableCell colSpan={columns?.length}>
                                <Typography variant="h6"
                                    sx={{ textAlign: "center" }}><CircularProgress /></Typography></TableCell></TableRow>
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}