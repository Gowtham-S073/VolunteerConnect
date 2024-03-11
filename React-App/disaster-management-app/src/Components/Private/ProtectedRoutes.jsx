import { Outlet,Navigate } from "react-router-dom";
import { ApiContext } from '../Context/ApiContext';
import { useContext} from "react";
const ProtectedRoutes=()=>{
    const token = sessionStorage.getItem('Token');
    return(
        
        token != null ? <Outlet /> : <Navigate to={'/'} />
        
    );
}

export default ProtectedRoutes;