import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import Request from './Components/Request';
import TrackRequest from './Components/TrackRequest/TrackRequest';
import DashboardLayout from './Components/Dashboard';
import Sidebar from './Components/sidebar';
import ShowRequest from './Components/ShowRequest';
import ShowTrackRequest from './Components/TrackRequest/ShowTrackRequest';
import ProtectedRoutes from './Components/Private/ProtectedRoutes'
import RequestDetails from './Components/TrackRequest/RequestDetails';
import { ApiContextProvider } from './Components/Context/ApiContext';
import Notfound from './Components/NotFound/NotFound';
import SignUp from './Components/SignUp';
import SignIn from './Components/Login';
import Header from './Components/header';
import { ApiContext } from './Components/Context/ApiContext';
import Dos_Dont from './Components/Dos_Dont';
import SafetyTips from './Components/SafetyTips';
import 'react-toastify/dist/ReactToastify.css';
import NearByRequest from './Components/NearByRequest/NearbyRequest';
import Das from './Components/sidebar';
import File from './Components/file';

function App() {
  const token  = sessionStorage.getItem('Token');
  return (
    <Router>
      <ApiContextProvider>
         {token !=null ? null : <Header />}
        <Routes>
          <Route index element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/request" element={<Request />} />
          <Route path="/trackRequest" element={<TrackRequest />} />
          <Route path='/ShowTrackRequest' element={<ShowTrackRequest />} />
          <Route path='/popupRequestDetails' element={<RequestDetails />} />
          <Route path="*" element={<Notfound />} />
          <Route path='/DosDont' component={<Dos_Dont />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/file' element={<File />}/>
              <Route path='/SafetyTips' element={<SafetyTips />} />
              <Route path='/VolunteerDashboard' element={<DashboardLayout />} />
              <Route path='/showrequest' element={<ShowRequest />} />
              <Route path='/NearByRequest' element={<NearByRequest />} />
           </Route>

        </Routes>
      </ApiContextProvider>
    </Router>
  );
}

export default App;
