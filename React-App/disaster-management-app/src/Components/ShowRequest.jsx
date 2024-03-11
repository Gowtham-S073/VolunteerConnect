import React, { useState, useEffect,useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/base';
import { ApiContext } from '../Components/Context/ApiContext';
import NearByRequest from './NearByRequest/NearbyRequest';

async function getReverseGeocodingData(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch reverse geocoding data. HTTP status: ${response.status}`);
    }

    const data = await response.json();

    // Validate data structure
    if (!data || !data.display_name) {
      throw new Error('Invalid response format for reverse geocoding data');
    }

    const address = data.display_name;
    return address;
  } catch (error) {
    console.error('Error during reverse geocoding:', error.message);
    return null;
  }
}


function Row(props) {
  const { row, onAccept } = props;
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState(null);
  const [history, setHistory] = React.useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7201/api/Request/Pending Request?requestId=${row.request_id}`
      );
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };
  useEffect(() => {
    const fetchAddress = async () => {
      const address = await getReverseGeocodingData(row.latitude, row.longitude);
      setAddress(address);
    };


    fetchAddress();
    if (open) {
      fetchHistory();
    }
  }, [open, row.latitude, row.longitude, row.request_id]);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {address || 'Loading...'}
        </TableCell>
        <TableCell align="right">{row.count}</TableCell>
        <TableCell align="right">{row.phoneNumber}</TableCell>
        <TableCell align="right">{row.disasterName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Request Details
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">S.no</TableCell>
                      <TableCell align="center">Items</TableCell>
                      <TableCell align="center">Accept the Request</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((historyRow, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{historyRow.items}</TableCell>
                        <TableCell align="center">
                          <Button variant="outlined" onClick={() => onAccept(historyRow.donationItemId, row.request_id)}>
                            Accept
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    requestId: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    disasterName: PropTypes.string.isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
};

function ShowRequest() {
  const [data, setData] = useState([]);
  const {decodedToken } = useContext(ApiContext);

  useEffect(() => {
    axios
      .get('https://localhost:7201/api/Request/DisplayRequestsForVolunteers')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAccept = async (donationItemIdi, requestIdi) => {

    var volunteerIdInt = parseInt(decodedToken.VolunteerId, 10);


    const list =[{
      requestId:requestIdi,
      volunteerId: volunteerIdInt,
      donationItemId:donationItemIdi 
    }]

    try {
      const response = await axios.post('https://localhost:7201/api/VolunteerMapping', list);
      console.log('Request accepted successfully:', response.data);
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  return (
    <>
    <div style={{marginLeft:'250px',marginTop:'20px'}}>
    <div style={{marginBottom:'30px',fontWeight:'bold',fontSize:'25px',textAlign:'center'}}>
      <h1>All Requests</h1>
    </div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Address</TableCell>
            <TableCell align="center">People Count</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Disaster Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.requestId} row={row} onAccept={handleAccept} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{marginTop:'80px',textAlign:'center'}}>
      <NearByRequest  />
    </div>
    </div>
    </>
  );
}

export default ShowRequest;
