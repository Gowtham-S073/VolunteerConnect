import React, { useState } from 'react';
import './TrackRequest.css';
import { Padding } from '@mui/icons-material';
import ShowTrackRequest from './ShowTrackRequest';
import axios from 'axios';

const TrackRequest = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [backendData, setBackendData] = useState(null);

  const isValidPhoneNumber = (number) => /^\d{10}$/.test(number);

  const handleSubmit = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      setShowConfirmation(true);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleConfirm = async () => {
    if (isValidPhoneNumber(phoneNumber)) {
      
      const response = await axios(`https://localhost:7201/api/User/User's Request Details by phone number?phoneNumber=${phoneNumber}`);
      const data = await response.data;
      console.log(response.data);
      setBackendData(data);
      setShowConfirmation(false);
    } else {
      alert('Invalid phone number.');
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
console.log("back ",backendData)
  return (
    <div className='RequestContent' style={{ marginTop: '100px' }}>
      
      <form>

      <div>
      <h1 className='Title_TrackRequest'>Track Your Request</h1>
      </div>

        <label htmlFor="phoneNumber">Enter you Phone Number to track your request:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/, ''))}
          maxLength="10"
        />
        <button className='trackButton' type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>

      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to track details for {phoneNumber}?</p>
          <div style={{paddingBottom:"20px"}}>
          <button className='trackButton' onClick={handleConfirm}>Confirm</button>
          </div>
          <div>
          <button className='trackButton' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
      {backendData && <ShowTrackRequest requestdata={backendData} />}

      
    </div>
    
  );
};

export default TrackRequest;
