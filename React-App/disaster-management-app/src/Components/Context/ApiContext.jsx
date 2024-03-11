import { FlareSharp } from '@mui/icons-material';
import React, { createContext, useState,  } from 'react';


const ApiContext = createContext();
const ApiContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequestID, setSelectedRequestID] = useState(null);
  const [decodedToken,setDecodedToken]=useState();
 const [token,setToken] = useState(null);
 const [safe,setSafe] =useState(true);
 const[request,setRequestNot] =useState(false);
    return (
        <ApiContext.Provider value={{
            openModal,selectedRequestID,token,decodedToken,safe,request,setRequestNot,setSafe,
            setOpenModal,setSelectedRequestID,setToken,setDecodedToken
        }}>
          {children}
        </ApiContext.Provider>
      );
}
export { ApiContext, ApiContextProvider };