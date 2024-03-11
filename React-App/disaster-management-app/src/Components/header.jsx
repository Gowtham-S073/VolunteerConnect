import { useState } from 'react';
import { Link } from 'react-router-dom';
import WebLogo from '../Assets/Weblogo.png';
import Login from './Login'; // Import the Login component
import SignUp from './SignUp'; // Import the SignUp component
import Weblogo2 from '../Assets/Weblogo2.png';
import * as React from 'react';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
    setShowSignUp(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <div >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>

            <Typography variant="h6" noWrap component="div">
              <Link to="/VolunteerDashboard" className="flex items-center space-x-3 rtl:space-x-reverse mx-10 mr-80">
                <img src={Weblogo2} className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2l font-semibold whitespace-nowrap dark:text-white">RESCUE READY</span>
              </Link>
            </Typography>
            <Typography
              className="flex items-center space-x-3 rtl:space-x-reverse "
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose} ><Link to={"/"}>Home</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to={"/request"}>Request</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to={"trackRequest"}>Your Requests and it's Status</Link></MenuItem>
            </Typography>

            <Typography sx={{
              marginLeft: '270px'
            }}>

              <Link to={"/signup"}>
                <button style={{ backgroundColor: '#003153' }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                //onClick={handleLoginClick}
                >
                  Volunteer Registration
                </button>
              </Link>
            </Typography>

          </Toolbar>
        </AppBar>
      </Box>


      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div style={{ backgroundColor: '#126180' }} className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={WebLogo} className="h-8" alt="RescuReady Logo" />
            <span className="self-center text-2l font-semibold whitespace-nowrap dark:text-white">RESCUE READY</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
            {/* <Link to="/trackRequest" style={{ backgroundClip: '#e86100' }} className="button">
              Track Request
            </Link> */}


            <div>
              <button
                id="basic-button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                data-collapse-toggle="navbar-sticky"
              >
                <MenuIcon />
              </button>

            </div>




          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul style={{ backgroundColor: '#126180' }} className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/request"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Request
                </Link>
              </li>
              <li>
                <Link
                  to={"/trackRequest"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Your Requests and it's Status
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {showLogin && <Login setShowLogin={setShowLogin} />}
      {showSignUp && <SignUp setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} handleLoginClick={handleLoginClick} />}
   </div>
    </>
  );
};

export default Header;
