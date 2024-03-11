import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
import { ApiContext } from './Context/ApiContext';
import DoDontComponent from './Dos_Dont';
import SafetyTips from './SafetyTips';
import RescueLogo from '../Assets/Weblogo2.png'
const drawerWidth = 240;

export default function ClippedDrawer() {
  const [showRequests, setShowRequests] = useState(false);

  const handleButtonClick = (buttonText) => {
    console.log(`Button clicked: ${buttonText}`);
    
    if (buttonText === 'Requests') {
      setShowRequests(!showRequests);
    }else if (buttonText === 'Dashboard') {
      navigate('/Dos_Dont');
  }
};
  const navigate = useNavigate();
  const { token, setToken,setRequestNot,setSafe  } = useContext(ApiContext);

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("Token");
    sessionStorage.clear();
    navigate('/');
  }
  const handleListItemClick = (text) => {
    // Perform any logic you need here
    console.log(`Clicked on ${text}`);

    // Optionally, navigate to a different route using history.push
    if (text === 'Dashboard') {
      setSafe(true);
      setRequestNot(false);
    } else if (text === 'Requests') {
      setSafe(false);
      setRequestNot(true);
    }

  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" style={{color: 'white' }} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <Link to="/VolunteerDashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={RescueLogo} className="h-8" alt="RescueReady Logo" />
              <span className="self-center text-2l font-semibold whitespace-nowrap dark:text-white">RESCUE READY</span>
            </Link>
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Requests'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={index === 0 ? '/SafetyTips' : '/showrequest'}  onClick={() => handleListItemClick(text)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      </Box>
    </Box> 
    {/* <SafetyTips /> */}
    </div>
  );
}
