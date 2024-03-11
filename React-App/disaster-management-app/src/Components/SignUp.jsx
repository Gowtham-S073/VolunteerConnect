import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./SignUp.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { Link,useNavigate } from 'react-router-dom';
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
 
 
 
const SignUp = ({handleLoginClick}) => {
 
  const navigate = useNavigate();
 
 
  const [mapVisible, setMapVisible] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [map, setMap] = useState(null);
  const [isActive, setIsActive] = useState(true);
  let markers = [];
  const handleStatusToggle = () => {
    setIsActive(!isActive);
  };
 
 
  useEffect(() => {
    if (mapVisible && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // console.log(latitude, longitude, position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Error getting user location:', error.message);
          // Set default location (India)
          setLatitude(20.5937);
          setLongitude(78.9629);
        }
      );
    }
  }, [mapVisible, markers]);
 
 
 
  useEffect(() => {
    if (mapVisible && latitude !== null && longitude !== null) {
      initializeMap(latitude, longitude);
    }
  }, [mapVisible, latitude, longitude]);
 
 
 
  const initializeMap = (initialLat, initialLng) => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }
 
    // Keep track of markers
    let leafletMap;
 
    if (!map) {
      leafletMap = L.map('map').setView([initialLat, initialLng], 13);
      setMap(leafletMap);
 
      mapContainer.style.zIndex = '1000';
 
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(leafletMap);
 
      // Add a marker at the initial location
      const initialMarker = L.marker([initialLat, initialLng])
        .addTo(leafletMap)
        .bindPopup('Your Location: ' + initialLat + ', ' + initialLng, { closeButton: true })
        .openPopup();
 
      markers.push(initialMarker);
 
      leafletMap.on('click', function (event) {
        const clickedLatLng = event.latlng;
        setLatitude(event.latlng.lat);
        setLongitude(event.latlng.lng);
 
        // Remove existing markers
        markers.forEach((marker) => {
          leafletMap.removeLayer(marker);
        });
        markers = []; // Clear the array
 
        // Add a marker at the clicked location
        const newMarker = L.marker(clickedLatLng)
          .addTo(leafletMap)
          .bindPopup('Selected Location: ' + clickedLatLng.lat + ', ' + clickedLatLng.lng, { closeButton: true })
          .openPopup();
 
        markers.push(newMarker);
 
        console.log('Selected Location:', clickedLatLng);
        // setLatitude(clickedLatLng.lat);
        // setLongitude(clickedLatLng.lng);
      });
 
      const confirmButton = L.control({ position: 'bottomleft' });
 
      confirmButton.onAdd = function () {
        const buttonDiv = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        const button = L.DomUtil.create('button', 'leaflet-bar-part leaflet-bar-part-single', buttonDiv);
        button.title = 'Confirm Location';
        button.innerHTML = 'Confirm Location';
 
        // Attach the event listener programmatically
        button.addEventListener('click', handleConfirmClick);
 
        return buttonDiv;
      };
 
      confirmButton.addTo(leafletMap);
 
      // Function to handle the confirm button click
      function handleConfirmClick(event) {
        event.stopPropagation();
        window.closeMap();
      }
 
 
 
 
    }
 
    // Add a search bar to the map
    const searchControl = L.Control.geocoder({
      defaultMarkGeocode: false,
      collapsed: false,
    }).on('markgeocode', function (e) {
      const { center } = e.geocode;
      leafletMap.setView(center, 13);
 
      // Remove existing markers
      markers.forEach((marker) => {
        leafletMap.removeLayer(marker);
      });
      markers = []; // Clear the array
 
      // Add a marker at the selected location
      const newMarker = L.marker(center)
        .addTo(leafletMap)
        .bindPopup('Selected Location: ' + center.lat + ', ' + center.lng, { closeButton: true })
        .openPopup();
 
      markers.push(newMarker);
 
      console.log('Selected Location:', center);
    });
 
    // searchControl.addTo(leafletMap);
  };
 
  const openMap = () => {
    setMapVisible(true);
  };
 
  // Assign closeMap function to the window object
  window.closeMap = () => {
    setMapVisible(false);
    setMap(null);
  };
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
 
    // Prepare the data for the API request
    const volunteerName = document.getElementById('name').value;
    const phoneNo = document.getElementById('contact').value;
    const emailId = document.getElementById('email').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const volunteerPassword = document.getElementById('password').value;
 
    console.log('Volunteer Name:', volunteerName);
    console.log('Phone Number:', phoneNo);
    console.log('Email ID:', emailId);
    console.log('Status:', isActive ? 'Available' : 'Unavailable');
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Volunteer Password:', volunteerPassword);
 
    const data = {
      volunteerId: 0,
      volunteerName: volunteerName,
      phoneNo: phoneNo,
      emailId: emailId,
      status: isActive ? 'Available' : 'Unavailable',
      latitude: latitude,
      longitude: longitude,
      volunteerPassword: volunteerPassword,
    };
 
 
 
    try {
      // Make the API request
      const response = await fetch('https://localhost:7201/api/Volunteer/Register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
        body: JSON.stringify(data),
      });
 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
 
      const result = await response.json();
      console.log('API Response:', result);
      alert("Registration successful");
      navigate('/signin');
      handleLoginClick();
 
 
    } catch (error) {
      console.error('Error during API request:', error.message);
    }
  };
 
 
 
 
 
  return (
    <div className="flex items-center justify-center h-screen">
      {mapVisible && (
        <div id="map" className="absolute top-0 left-0 z-10 w-full h-screen"></div>
      )}
      <div className={`max-w-sm w-full p-4 bg-white-200 border border-white-300 rounded-lg shadow sm:p-2 md:p-4 overflow-y-auto ${mapVisible ? 'hidden' : ''}`}>
        <form className="space-y-2" onSubmit={handleFormSubmit}>
          {/* ... your existing form fields */}
          <div>
            <div>
              <label htmlFor="name" className="block mb-1 text-xs font-medium text-blue-800">Your name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-white border border-blue-300 text-blue-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="contact" className="block mb-1 text-xs font-medium text-blue-800">Contact number</label>
              <input
                type="tel"
                name="contact"
                id="contact"
                className="bg-white border border-blue-300 text-blue-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                placeholder="123-456-7890"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-xs font-medium text-blue-800">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-white border border-blue-300 text-blue-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-xs font-medium text-blue-800">Your password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-white border border-blue-300 text-blue-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                required
              />
            </div>
 
            <div>
              <label htmlFor="latitude" className="block mb-1 text-xs font-medium text-blue-800">Latitude:</label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={latitude}
                required
                className="bg-white border border-blue-300 text-blue-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block mb-1 text-xs font-medium text-blue-800">Longitude:</label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                required
                value={longitude}
                className="bg-white border border-blue-300 text-blue-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              />
            </div>
 
            <div className="flex items-center mt-2">
              <span className="mr-2 text-xs font-medium text-blue-800">Status:</span>
              <label className="switch">
                <input
                  type="checkbox"
                  id="statusToggle"
                  name="statusToggle"
                  checked={isActive}
                  onChange={handleStatusToggle}
                />
                <span className="slider"></span>
              </label>
              <span className="ml-2 text-xs font-medium text-blue-800">{isActive ? 'Available' : 'Unavailable'}</span>
            </div>
 
            <button
              type="button"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center mt-2"
              onClick={openMap}
            >
              Choose Location on Map
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center mt-2"
          >
            Register Volunteer
          </button>
          <div className="text-sm font-medium text-blue-500">
           Already have an account? <Link to={"/signin"} className="text-blue-800 hover:underline">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default SignUp;