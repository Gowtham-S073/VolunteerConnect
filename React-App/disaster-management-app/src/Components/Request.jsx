import React, { useEffect, useState } from "react";
import axios from "axios";
import Shelter from "../Assets/DisasterNeeds/Shelter.jpg";
import CannedFood from "../Assets/DisasterNeeds/Canned Food.jpg";
import Blankets from "../Assets/DisasterNeeds/Blankets.jpg";
import DrinkingWater from "../Assets/DisasterNeeds/Drinking water.jpg";
import FirstAidKits from "../Assets/DisasterNeeds/First Aid Kits.jpg";
import HygieneProducts from "../Assets/DisasterNeeds/Hygiene Products.jpg";
import Flashlights from "../Assets/DisasterNeeds/Flashlights.jpg";
import Batteries from "../Assets/DisasterNeeds/Batteries.jpg";
import Milk from "../Assets/DisasterNeeds/Milk.jpg";
import { useNavigate } from "react-router";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "./Request.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />


const DisasterForm = () => {
  const [mapLocation, setMapLocation] = useState(null);
  const [Category, setCategory] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDisaster, setSelectedDisaster] = useState(0);
  const [count, setCount] = useState(0);
  const [map, setMap] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  let markers = []; // Keep track of markers
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [selectedCheckboxItems, setSelectedCheckboxItems] = useState([]);
  const [alert, setAlert] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState("");

  const navigate = useNavigate();



  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    // Define a regular expression for a basic phone number pattern
    const phoneRegex = /^\d{10}$/;

    // Check if the entered value matches the phone number pattern
    if (!phoneRegex.test(value)) {
      setPhoneNumberError("Please enter a valid phone number (10 digits).");
    } else {
      setPhoneNumberError("");
    }
  };


  const openMap = () => {
    setMapVisible(true);
  };

  // Assign closeMap function to the window object
  window.closeMap = () => {
    setMapVisible(false);
    setMap(null);
  };

  const handleCountChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input is a non-negative number
    if (/^\d+$/.test(inputValue) || inputValue === '') {
      setCount(inputValue);
    }
  };

  const handleDisasterChange = (e) => {
    const selectedDisasterId = e.target.value;
    console.log("ID :", selectedDisasterId);
    setSelectedDisaster(selectedDisasterId);
  };


  const donationItemImageMap = {
    "Shelter": "https://img.freepik.com/free-vector/colorful-tourist-tents-set_1284-17497.jpg?w=740&t=st=1705958470~exp=1705959070~hmac=d6f001bb7a0cde229c279fd41da596ca9733601fc2105acf5d6d65090ac67285",
    "Canned Food": "https://img.freepik.com/free-vector/set-tin-food_1308-26262.jpg?w=900&t=st=1705958444~exp=1705959044~hmac=52c905236a74efb19dd85be8c4d586e40b3898292e4346c69aeb243b4da81660",
    "Blankets": "https://img.freepik.com/free-photo/medium-shot-smiley-woman-with-blanket_23-2149304898.jpg?w=1060&t=st=1705958388~exp=1705958988~hmac=944b8fbabf114c807c85ba574df26def435f3d94fab7cf8bc8a224d1777ace7c",
    "Drinking water": "https://img.freepik.com/free-photo/front-view-smiley-delivery-man-carrying-water-bottle-smartphone_23-2148382475.jpg?w=900&t=st=1705958356~exp=1705958956~hmac=44c52a54fd8eb3a269cb1379e2de76ce44259aecd302552196319e3e4c76368b",
    "First Aid Kits": "https://img.freepik.com/free-photo/front-view-arrangement-medical-still-life-elements_23-2148854058.jpg?w=900&t=st=1705958271~exp=1705958871~hmac=b72d720490a7e3387c81724bd25bc03052928c3d297e6e2f5f91567e5926f1d6",
    "Hygiene Products": "https://img.freepik.com/free-photo/beauty-concept-with-different-products_23-2147817660.jpg?w=1060&t=st=1705956472~exp=1705957072~hmac=ded0445e05d812041dfbfaf34d3f170f390040fa4c05d487ee36a04d22b220f3",
    "Flashlights": "https://img.freepik.com/free-photo/flashlight-torch_1203-7482.jpg?w=1060&t=st=1705956553~exp=1705957153~hmac=dde4ed131672d06029021571834203418d3c06561bfbafaa78aa61e6a385a329",
    "Batteries": "https://img.freepik.com/free-photo/3d-recycle-batteries_23-2148907389.jpg?w=900&t=st=1705958135~exp=1705958735~hmac=0816318ca8a7c4381d4725e00af5d779517ab8e542f4fa8162b3b256c08b0c65",
    "Milk": "https://img.freepik.com/free-vector/bottle-glass-milk_1284-14094.jpg?w=740&t=st=1705956661~exp=1705957261~hmac=50a38aa10a4ebb914e054709b221e5b85e4a0ffa0d7ba9e6d4aed09d5adea609",
    "Non-perishable Food": "https://img.freepik.com/free-photo/tasty-food-arrangement-top-view_23-2149182196.jpg?w=1060&t=st=1705956724~exp=1705957324~hmac=a171cf0901d5a8ce715aab88ea01cc379cc4a73278a90ad2e0b1d738b701265f",
  };


  const handleCheckboxChange = (itemId) => {
    const updatedSelectedCheckboxItems = selectedCheckboxItems.includes(itemId)
      ? selectedCheckboxItems.filter((id) => id !== itemId)
      : [...selectedCheckboxItems, itemId];

    setSelectedCheckboxItems(updatedSelectedCheckboxItems);
  };

  const [disasterOptions, setDisasterOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7201/api/Disaster/disasters");
        setDisasterOptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7201/api/DisasterNeed"
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
          setLatitude(12.5937);
          setLongitude(80.2229);
        }
      );
    }
  }, [mapVisible]);



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

  const handleSendData = async () => {
    try {
      const userResponse = await axios.post("https://localhost:7201/api/User", apiParameters.User);

      if (userResponse.data && userResponse.data.userId) {
        console.log("userResponse.data:", userResponse.data.userId);

        const requestResponse = await axios.post("https://localhost:7201/api/Request", {
          latitude: latitude,
          longitude: longitude,
          count: count,
          userId: userResponse.data.userId,
          disasterId: selectedDisaster,
          additionalDetails: additionalDetails,
        });

        console.log("requestResponse.data:", requestResponse.data);
        console.log("Donation Items:", selectedCheckboxItems);

        if (requestResponse.data && requestResponse.data.requestId) {
          const requestId = requestResponse.data.requestId;

          // Create an array of request details objects
          const requestDetailsArray = selectedCheckboxItems.map((donationItemId, index) => {
            return {
              requestId: requestId,
              donationItemId: donationItemId,
            };
          });
          console.log("requestDetailsArray:", requestDetailsArray);

          await axios.post("https://localhost:7201/api/RequestDetails", requestDetailsArray);

          
          console.log("Data sent successfully");
          alert("Request sent successfully");
          navigate('/');
          setAlert({ severity: 'success', message: 'Data sent successfully' });
        } else {
          console.error("Error sending data: Invalid request response structure");
          setAlert({ severity: 'error', message: 'Error sending data: Invalid request response structure' });
        }
      } else {
        console.error("Error sending data: Invalid user response structure");
        setAlert({ severity: 'error', message: 'Error sending data: Invalid user response structure' });
      }
    } catch (error) {
      console.error("Error sending data:", error);

      if (error.response?.status === 500 && error.response?.data?.message.includes("FK__Request__Disaste__")) {
        setAlert({ severity: 'error', message: 'Invalid disaster selected. Please choose a valid disaster.' });
      } else {
        setAlert({ severity: 'error', message: 'Error sending data' });
      }
    }
  };

  const apiParameters = {
    User: {
      phoneNumber: phoneNumber
    }
  };


  return (
     <div className="RequestContent" style={{marginTop:'70px', fontFamily:' -apple-system, BlinkMacSystemFont, sans-serif !important;'}}>

      <div className="RequestForm">
        <div>
          <h1 className="Title_Request">REQUEST HELP</h1>
        </div>
        <div className="container">

          {mapVisible && (
            <div id="map" className="absolute top-0 left-0 z-10 w-full h-screen"></div>
          )}

          {/* Display MUI alerts */}
          {alert && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity={alert.severity}>{alert.message}</Alert>
            </Stack>
          )}


          <div>
            <label htmlFor="phoneNumber">
              Phone Number<span style={{ color: "red" }}>*</span>  :
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit number."
              placeholder="Enter your phone number"
            />
            {phoneNumberError && <p style={{ color: "red" }}>{phoneNumberError}</p>}
          </div>

          <div style={{ alignItems: "center" }}>
            <label htmlFor="locationButton">
              Location <span style={{ color: "red" }}>*</span>  :
            </label>

            <button
              id="locationButton"
              type="button"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center mt-2"
              onClick={openMap}
            >
              Choose Location on Map
            </button>
          </div>

          <div>
            <label htmlFor="count" style={{ paddingTop: "50px" }}>
              Number Of People  <span style={{ color: "red" }}>*</span>  :
            </label>
            <input
              type="number"
              id='count'
              value={count}
              onChange={handleCountChange}
              placeholder="Enter the number of people"
            />
          </div>

          <div>
            <label htmlFor="disasterType">
              Type of Disaster<span style={{ color: "red" }}>*</span>  :
            </label>
            <select
              id="disasterType"
              value={selectedDisaster}
              onChange={handleDisasterChange}
            >
              <option value="">Select a disaster type</option>
              {disasterOptions.map((disaster) => (
                <option key={disaster.disasterId} value={disaster.disasterId}>
                  {disaster.disasterName}
                </option>
              ))}
            </select>
          </div>


          <label htmlFor="donationItemId">
              Select the Required Item<span style={{ color: "red" }}>*</span>  :
            </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
            {Category.slice(0, 10).map((item) => (
              <div key={item.donationItemId} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                <a href="#">
                  <img className="rounded-t-lg object-cover h-40 w-full" src={donationItemImageMap[item.items]} alt={item.items} />
                </a>
                <div className="p-5 h-20" style={{ display: "flex" }}>
                  <label className="mb-2 block flex items-center">
                    <input
                      type="checkbox"
                      value={item.donationItemId}
                      checked={selectedCheckboxItems.includes(item.donationItemId)}
                      onChange={() => handleCheckboxChange(item.donationItemId)}
                    />
                    <span className="ml-2">{item.items}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>


          <div style={{ paddingTop: "50px" }}>
            <label htmlFor="additionalDetails">
              Additional Details<span style={{ color: "red" }}>*</span>  :
            </label>
            <input
              type="text"
              id="additionalDetails"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Enter additional details"
            />
          </div>

          {/* Button to send data back to the backend */}
          <div className="flex items-center justify-center mt-24">
            <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSendData}>
              Send Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterForm;