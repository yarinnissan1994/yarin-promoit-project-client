import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCampaigns } from "../../services/services";
import "./allCampaigns.css";

export const AllCampaignsPage = () => {
  const navigate = useNavigate();
  const [campaignList, setCampaignList] = useState([]);

  const getCampaignsFromDB = async () => {
    let res = await getCampaigns();
    setCampaignList(res);
  };
  useEffect(() => {
    getCampaignsFromDB();
  }, []);

  const handleMoreInfo = (Campaign) => {
    navigate("/campaign", {
      state: {
        Campaign,
      },
    });
  };

  return (
    <div className="AllCampaigns--my-cards my-cards">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {campaignList &&
          campaignList.map((campaign) => {
            return (
              <>
                <div className="col">
                  <div className="card my-card">
                    <img
                      src={campaign.Image}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{campaign.Name}</h5>
                      <h6 className="card-title">{campaign.HashTag}</h6>
                      <p className="card-text">
                        For more info about our Social Agenda click on the
                        button bellow!
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleMoreInfo(campaign)}
                      >
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};
