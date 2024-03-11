import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import img from "../Assets/helpImage.jpg";
import News from "./News";
import "./Main.css";
import Request from './Request';
import Footer from "./Footer";


const Main = () => {
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation class after the component mounts to trigger the word-by-word animation
    setAnimationClass("animate");
  }, []);

  const handleRequestClick = () => {
    navigate('/Request');
  }

  return (
    <div>
      <Header />
      <div className={`max-w-screen-xl mx-auto mt-16 p-8 ${animationClass}`}>
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          {/* Responsive Image on the left */}
          <img
            style={{ marginTop: "80px" }}
            src={img}
            className="w-full md:w-1/2 md:max-w-md rounded-lg mb-4 md:mb-0 hover:opacity-75 transition-opacity duration-300 ease-in-out"
            alt="Responsive Image"
          />

          {/* Contents on the right */}
          <div className="md:w-1/2">

            <button class="btn" onClick={handleRequestClick}>Request ❤️</button>

            <h1
              style={{ color: "#436b95" }}
              className="text-5xl font-bold mb-2 text-blue-700"
            >
              <span>Volunteer</span> <span>Assistance</span> <span>Network</span>
            </h1>
            <p className="text-gray-700 text-xl">
              Welcome to our Volunteer Assistance Network! We provide essential
              information and resources to help communities prepare for, respond
              to, and recover from disasters.
            </p>
            <h2
              className="text-1xl font-bold mt-4 mb-2"
              style={{ color: "#436b95" }}
            >
              Key Features
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Emergency Planning Guides</li>
              <li>Real-time Disaster Alerts</li>
              <li>Community Action Plans</li>
              <li>Resource Directories</li>
              <li>Interactive Maps and Evacuation Routes</li>
            </ul>
            
          </div>
        </div>
      </div>
      <div className="news_content">
      <h2
              className="text-1xl font-bold mt-4 mb-2"
              style={{ color: "#436b95", fontSize:"40px", paddingTop:"20px" }}
            >
              Latest News and Updates
            </h2>
            <p className="text-gray-700" style={{padding:"40px", backgroundColor:"white"}}>
              Stay informed about recent disasters, ongoing relief efforts, and
              best practices in disaster management. Our news section provides
              timely updates and valuable insights.
            </p>
            <div>
      <News></News>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
