
import "../styles/Navbar.css"
import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from "react";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import upcomingSportsGamesSVG from "./upcomingSportsGames.svg"
function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const { logout } = useLogout()
    const {user} = useAuthContext()
    const location = useLocation();
    const routesmap = {"/":"home", "/contact": "contact", "/teams":"teams", "/signup":"signup", "/login":"login", "/demo": "demo"}

    const handleLogoutClick = () => {
        logout()
    }
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
  
    const handleBarClick = () => {
      setClicked(!clicked);
    }

    useEffect(() => {
      handleLinkClick(routesmap[location.pathname])
     });
  
    return (
      <>
        <nav>
            <Link to="/" onClick={() => {handleLinkClick('home');}}>
              <img src={upcomingSportsGamesSVG} alt="Upcoming Sports Games" />
            </Link>
          <div>
            <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
            <li>
              <Link
                to="/"
                className={`Link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={() => handleLinkClick('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/demo"
                className={`Link ${activeLink === 'demo' ? 'active' : ''}`}
                onClick={() => handleLinkClick('demo')}
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`Link ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={() => handleLinkClick('contact')}
              >
                Contact
              </Link>
            </li>
            {user && (
                    <>
                         <li>
                            <Link
                                to="/teams"
                                className={`Link ${activeLink === 'teams' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('teams')}
                            > My Teams
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className={`Link`}
                                onClick={() => {handleLogoutClick(); handleLinkClick('home');}}
                            > Logout
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/teams"
                                className={`Link`}
                                onClick={() => {handleLinkClick('teams');}}
                            >{user.phone}
                            </Link>
                        </li>
                    </>
                    )}
            {!user && (<>
                        <li>
                            <Link
                                to="/login"
                                className={`Link ${activeLink === 'login' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('login')}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className={`Link ${activeLink === 'signup' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('signup')}
                            >
                                Sign Up
                            </Link>
                        </li>
            </>
            )}
            </ul>
          </div>
  
          <div id="mobile" onClick={handleBarClick}>
            <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"} style={{position:"relative", left:"25px"}}></i>
          </div>
        </nav>
      </>
    );
  }

export default Navbar;