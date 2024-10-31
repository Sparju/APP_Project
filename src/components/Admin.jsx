import { useEffect, useState } from "react";
import StudentServices from "../services/StudentServices";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Admin = () => {
  const [useData, setuserdata] = useState([])
  useEffect(() => {
    StudentServices.getAllStudents().then(res => (setuserdata(res.data), console.log(res, "<---"))).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <p>admin login</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>s.no</TableCell>
              <TableCell >user name</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {useData.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phoneNumber}</TableCell>
                <TableCell align="right">{row.dob}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Admin;
