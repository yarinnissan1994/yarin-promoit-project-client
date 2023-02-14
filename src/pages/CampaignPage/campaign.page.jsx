import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleCampaignIsActive } from "../../services/campaign.services";
import "./campaign.css";

export const CampaignPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [grave, setGrave] = useState(false);

  const { Campaign, Source } = location.state;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleReturn = () => {
    navigate("/all-campaigns");
  };

  const handleEdit = () => {
    navigate("/new-campaign", {
      state: {
        Campaign,
      },
    });
  };

  const handleShutDown = async () => {
    toggleCampaignIsActive(Campaign.Code);
    navigate("/all-campaigns");
  };

  const handleReRun = async () => {
    setGrave(!grave);
    await sleep(3000);
    toggleCampaignIsActive(Campaign.Code);
    navigate("/all-campaigns");
  };

  return (
    <div className="CampaignPage--container">
      <div className="card">
        <img src={Campaign.Image} className="card-img-top" alt="" />
        <div className="card-body">
          <h1 className="card-title">{Campaign.Name}</h1>
          <p className="card-text">{Campaign.Description}</p>
          <br />
          <h5 className="card-text">Email: {Campaign.Email}</h5>
          <br />
          <p className="card-text">
            Use the following HashTag to promote our Campaign in social media
            anNamed earn money!
          </p>
          <h4 className="card-text">{Campaign.HashTag}</h4>
          <br />
          <a href={Campaign.Landing_Page_URL}>
            <h3>Visit Our Website</h3>
          </a>
          <br />
          <h6>Campaign By {Campaign.NPO_Name}</h6>
          <br />
          <a href={Campaign.NPO_Website}>
            <h6>Visit Our Organization Website</h6>
          </a>
          <br />
          <h6>Organization Email: {Campaign.NPO_Email}</h6>
          <br />
          <div className="btn-container">
            {Source === "NPOCampaigns" && (
              <>
                <button className="btn btn-warning" onClick={handleEdit}>
                  Edit Campaign
                </button>
                {Campaign.Is_Active && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleShutDown()}
                  >
                    ShutDown Campaign
                  </button>
                )}
                {!Campaign.Is_Active && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleReRun()}
                  >
                    ReRun Campaign
                  </button>
                )}
                {grave && (
                  <img
                    className="grave-gif"
                    src="https://media.tenor.com/OZogo1WraIQAAAAM/wake-up-the-valentines.gif"
                    alt=""
                  />
                )}
              </>
            )}
            <button className="btn btn-danger" onClick={handleReturn}>
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
