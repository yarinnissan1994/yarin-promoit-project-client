import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import "./navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

export const NavbarComponent = (props) => {
  const { user, logout, loginWithRedirect } = useAuth0();
  return (
    <div className="Navbar--navbar-container navbar-container">
      <ul className="navbar-menu">
        <li>
          <Link to="/">
            <HomeIcon />
            <label className="Link-lbl">Home</label>
          </Link>
        </li>
        <li>
          <Link to="/all-campaigns">
            <CampaignIcon />
            <label className="Link-lbl">Campaigns</label>
          </Link>
        </li>
        <li>
          <Link to="/about-us">
            <Diversity3Icon />
            <label className="Link-lbl">About Us</label>
          </Link>
        </li>
        <li>
          <Link to="/contact-us">
            <SupportAgentIcon />
            <label className="Link-lbl">Contact Us</label>
          </Link>
        </li>
        {!user && (
          <li>
            <Link>
              <MeetingRoomIcon />
              <label
                onClick={() => loginWithRedirect("http://localhost:3000/")}
                className="Link-lbl"
              >
                LogIn
              </label>
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link>
              <MeetingRoomIcon />
              <label
                onClick={() => logout({ returnTo: window.location.origin })}
                className="Link-lbl"
              >
                LogOut
              </label>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
