import React from 'react';
import Sidebar from './sidebar';
import ShowRequest from './ShowRequest';
import { ToastContainer, toast } from 'react-toastify';
import Dos_Dont from './Dos_Dont';
import { useEffect } from 'react';
const DashboardLayout = ({ children }) => {


  useEffect(() => {
    const token = localStorage.getItem("Name");
    if (token) {
      toast.success("Welcome " + " to Rescue Ready");
    }
  }, [toast]);

  return (
    <div className="dashboard-container" style={{fontFamily:' -apple-system, BlinkMacSystemFont, sans-serif;', paddingTop:'80px'}}>
      <Sidebar /> 
      <div className="dashboard-right" style={{display:'flex'}}>
        
      </div>
      <main className="content-area"></main>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;

