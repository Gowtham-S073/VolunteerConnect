import React from 'react';
import notFound from '../../Assets/20824298_6342464.jpg';
import Not from '../../Assets/404-page-animation-example.gif'
import NotfoundPage from '../../Assets/20602754_6333074.jpg'
import { Link, useNavigate } from 'react-router-dom';
export default function Notfound() {
    const navigate = useNavigate();
    function nac(){
        sessionStorage.removeItem('Token');
        navigate('/');
    }
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-white">
       <img src={NotfoundPage} onClick={nac} alt="Not Found" className="max-w-full max-h-full" />
      </div>
    </>
  );
}
