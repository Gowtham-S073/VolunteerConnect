import React, { useState, useEffect,useContext } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Modalpopup from './RequestDetails'; // Import your Modalpopup component
import { ApiContext } from '../Context/ApiContext';

export default function ShowTrackRequest({ requestdata }) {

  const { openModal,setOpenModal,setSelectedRequestID,selectedRequestID} = useContext(ApiContext);


  const [addressData, setAddressData] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  // const [selectedRequestID, setSelectedRequestID] = useState(null);

  const getReverseGeocodingData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch reverse geocoding data');
      }

      const data = await response.json();
      const address = data.display_name;
      return address;
    } catch (error) {
      console.error('Error during reverse geocoding:', error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const updatedData = await Promise.all(
        requestdata.map(async (row, index) => {
          const address = await getReverseGeocodingData(row.latitude, row.longitude);
          return { ...row, address, index: index + 1 };
        })
      );

      setAddressData(updatedData);
    };

    fetchData();
  }, [requestdata]);

  const handleViewRequest = (request_id) => {
    setOpenModal(true);
    setSelectedRequestID(request_id);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">People Count</TableCell>
              <TableCell align="center">Disaster Name</TableCell>
              <TableCell align="center">View Request Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addressData.map((row) => (
              <TableRow key={row.requestid}>
                <TableCell align="left">{row.index}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.count}</TableCell>
                <TableCell align="left">{row.disasterName}</TableCell>
                <TableCell align="left">
                <Button onClick={() => handleViewRequest(row.request_id)} variant="outlined" color="primary">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openModal && (
        <Modalpopup
          // requestid={selectedRequestID}
          // tables={[
          //   { apiEndpoint: `https://localhost:7201/api/Request/Requests by Requestid?Id=${selectedRequestID}`, title: "Table 1" },
          // ]}
        />
      )}
    </>
  );
}