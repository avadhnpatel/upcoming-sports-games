import React from 'react';
import "../styles/Userteam.css"
import Leagues from '../components/Leagues';
import homevideo from "../components/homevideo.mp4"
import homesvg from "../components/homesvg.svg"
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="video-background">
        <video autoPlay muted loop id="myVideo">
          <source src={homevideo} type="video/mp4" />
        </video>
        <div className="content">
          <img className="homeimg" src={homesvg} alt="Upcoming Sports Games" />
          <Leagues />
          <Link to="/signup" className="getstarted">Get Started</Link>
        </div>
      </div>
    );
  }
  

export default Home; 
