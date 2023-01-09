import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./campaign.css";

export const CampaignPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { Campaign } = location.state;

  const handleReturn = () => {
    navigate("/all-campaigns");
  };
  return (
    <div class="CampaignPage--container mt-5">
      <div class="card">
        <img src={Campaign.Image} class="card-img-top" alt="" />
        <div class="card-body">
          <h1 class="card-title">{Campaign.Name}</h1>
          <p class="card-text">{Campaign.Description}</p>
          <br />
          <h5 class="card-text">Email: {Campaign.Email}</h5>
          <br />
          <p class="card-text">
            Use the following HashTag to promote our Campaign in social media
            and earn money!
          </p>
          <h4 class="card-text">{Campaign.HashTag}</h4>
          <br />
          <a href={Campaign.Landing_Page_URL}>
            <h3>Visit Our Website</h3>
          </a>
          <br />
          <button class="btn btn-danger" onClick={handleReturn}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};
