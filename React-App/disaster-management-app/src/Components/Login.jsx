import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import React, { useState, useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { ApiContext } from '../Components/Context/ApiContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Snackbar from '@mui/material/Snackbar';
import LoginBackground from '../Assets/LoginBackground.jpg';
import { ToastContainer, toast } from 'react-toastify';

const defaultTheme = createTheme();
const Login = () => {
  const { token, setToken,setDecodedToken,decodedToken } = useContext(ApiContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = {
    emailId: email,
    password: password
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data :", data);
    try {
      const response = await axios.post('https://localhost:7201/api/Volunteer/LogIN', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response data:", response.data);

      if (response.status === 200) {
        sessionStorage.setItem("Token", response.data.token);
        setToken(response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        setDecodedToken(decodedToken)
        alert("Login Successful");
        navigate('/file');
      } else {
        console.error(email, password, 'Login failed!');
        toast.error("Login failed!");
        
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      toast.error("Login failed!");
    }
  };
  
  const handleNavigate=()=>{
    navigate('/signup');
  }
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-blue-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border border-blue-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                    Not registered? <Link onClick={handleNavigate} className="text-blue-800 hover:underline" style={{cursor:'pointer'}}>Create account</Link>
                </Grid>
                
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer position="top-left"/>
    </ThemeProvider>
  );
};

export default Login;
