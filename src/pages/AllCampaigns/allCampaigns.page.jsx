import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CampaignsSourceContext } from "../../context/campaignsSource.context";
import { getCampaigns } from "../../services/campaign.services";
import { TwitterShareButton } from "react-twitter-embed";
import "./allCampaigns.css";

export const AllCampaignsPage = () => {
  const navigate = useNavigate();
  const [campaignList, setCampaignList] = useState([]);
  const { user } = useAuth0();
  const { source } = useContext(CampaignsSourceContext);

  const getCampaignsFromDB = async () => {
    let res = await getCampaigns();
    if (source === "BCCampaigns" || source === "SACampaigns") {
      let filteredRes = res.filter((c) => {
        if (c.Is_Active === true) return c;
      });
      res = filteredRes;
    } else if (source === "NPOCampaigns") {
      let filteredRes = res.filter((c) => {
        if (c.NPO_Email === user.email) return c;
      });
      res = filteredRes;
    }

    setCampaignList(res);
  };

  useEffect(() => {
    getCampaignsFromDB();
  }, [source]);

  const handleClick = (Campaign, Source) => {
    navigate("/campaign", {
      state: {
        Campaign,
        Source,
      },
    });
  };

  const handleCampaignProducts = (Campaign, Source) => {
    navigate("/Products", {
      state: {
        Campaign,
        Source,
      },
    });
  };

  const handleAddCampaignProducts = (Campaign) => {
    navigate("/add-campaign-product", {
      state: {
        Campaign,
      },
    });
  };

  return (
    <>
      <div className="campaigns-header-container">
        {source === "navbar" && user && (
          <h1 className="campaigns-header">Campaigns</h1>
        )}
        {source === "NPOCampaigns" && (
          <h1 className="campaigns-header">My Campaigns</h1>
        )}
        {source === "BCCampaigns" && (
          <h1 className="campaigns-header">Products Pannel</h1>
        )}
        {source === "SACampaigns" && (
          <h1 className="campaigns-header">Make A Donation</h1>
        )}
      </div>
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
                        <TwitterShareButton
                          url={campaign.Landing_Page_URL}
                          options={{
                            text:
                              "#PromoIt " +
                              campaign.HashTag +
                              " Campaign for " +
                              campaign.Name,
                            via: campaign.NPO_Name,
                          }}
                        />
                        {source === "navbar" && (
                          <p className="card-text">
                            For more info about our Social Agenda click on the
                            button bellow!
                          </p>
                        )}
                        {source === "NPOCampaigns" && (
                          <p className="card-text">
                            Click on the button bellow to make changes and
                            updates on your campaign
                          </p>
                        )}
                        {source === "BCCampaigns" && (
                          <p className="card-text">
                            Click on the button bellow to add products you want
                            to relate to this campagin
                          </p>
                        )}
                        {source === "SACampaigns" && (
                          <p className="card-text">
                            Click on the button bellow and Choose the item you
                            wish to Donate
                          </p>
                        )}
                        <div className="btn-container">
                          {source === "navbar" && (
                            <>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleClick(campaign, source)}
                              >
                                More Info
                              </button>
                              <button
                                className="btn btn-info"
                                onClick={() =>
                                  handleCampaignProducts(campaign, source)
                                }
                              >
                                Products
                              </button>
                            </>
                          )}
                          {source === "NPOCampaigns" && (
                            <>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleClick(campaign, source)}
                              >
                                Control Pannel
                              </button>
                              <button
                                className="btn btn-info"
                                onClick={() =>
                                  handleCampaignProducts(campaign, source)
                                }
                              >
                                Products
                              </button>
                            </>
                          )}
                          {source === "BCCampaigns" && (
                            <>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleClick(campaign, source)}
                              >
                                More Info
                              </button>
                              <button
                                className="btn btn-info"
                                onClick={() =>
                                  handleCampaignProducts(campaign, source)
                                }
                              >
                                Products
                              </button>
                              <button
                                className="btn btn-success"
                                onClick={() =>
                                  handleAddCampaignProducts(campaign)
                                }
                              >
                                Add Product
                              </button>
                            </>
                          )}
                          {source === "SACampaigns" && (
                            <>
                              <button
                                className="btn btn-primary"
                                onClick={() => handleClick(campaign, source)}
                              >
                                More Info
                              </button>
                              <button
                                className="btn btn-info"
                                onClick={() =>
                                  handleCampaignProducts(campaign, source)
                                }
                              >
                                Donate a Product
                              </button>
                            </>
                          )}
                        </div>
                        {!campaign.Is_Active && (
                          <img
                            className="complete-png"
                            src="https://www.onlygfx.com/wp-content/uploads/2018/04/completed-stamp-3-1024x684.png"
                            alt="complete"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
