import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import { useState, useEffect, useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { ApiContext } from '../Context/ApiContext';
import PendingRequest from "./PendingRequest";
const Modalpopup = () => {
  const [open, openChange] = useState(true);
  const [tableData, setTableData] = useState([]);
  const { setOpenModal, selectedRequestID } = useContext(ApiContext);

  const closePopup = () => {
    openChange(false);
    setOpenModal(false);
  }

  useEffect(() => {
    const fetchDataForTables = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Request/Requests by Requestid?Id=${selectedRequestID}`);
        const tableData = response.data;
        setTableData(tableData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchDataForTables();
  }, [selectedRequestID]);


  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog
        open={open} onClose={closePopup} fullWidth maxWidth="sm"
      >
        <DialogTitle>
          Request Details          
          <IconButton onClick={closePopup} style={{ float: 'right' }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">S.No</TableCell>
                    <TableCell align="center">Disaster Name</TableCell>
                    <TableCell align="center">Requested Item</TableCell>
                    <TableCell align="center">Additional Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{data.disasterName}</TableCell>
                      <TableCell align="left">{data.items}</TableCell>
                      <TableCell align="center">
                        {data.additionalDetails !== null ? data.additionalDetails : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </div>
          <div>
          <DialogTitle>
          Request Status          
          <PendingRequest></PendingRequest>
        </DialogTitle>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modalpopup;
