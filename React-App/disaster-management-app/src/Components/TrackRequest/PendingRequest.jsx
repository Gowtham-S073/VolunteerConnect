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

const PendingRequest = () => {
    const [pendingData, setPendingData] = useState([]);
    const [requestNotFound, setRequestNotFound] = useState(false);

    const { selectedRequestID } = useContext(ApiContext);

    useEffect(() => {
        const fetchDataForTables = async () => {
          try {
            const response = await axios.get(`https://localhost:7201/api/Request/Pending Request?requestId=${selectedRequestID}`);

                setPendingData(response.data);
                
        
          } catch (error) {
            setRequestNotFound(true);
            console.error('Error fetching data:', error.message);

          }
        };
    
        fetchDataForTables();
    }, [selectedRequestID]);

    return (
        <div style={{ textAlign: 'center' }}>
          {requestNotFound ? (
            <div>Request Completed</div>
          ) : (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">S.No</TableCell>
                      <TableCell align="center">Requested Item</TableCell>
                      <TableCell align="center">Additional Information</TableCell>
                      <TableCell align="center">Status</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{data.items}</TableCell>

                        <TableCell align="center">
                          {data.additionalDetails !== null ? data.additionalDetails : '-'}
                        </TableCell>
                        <TableCell align="left">Pending</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
    );
}

export default PendingRequest;
