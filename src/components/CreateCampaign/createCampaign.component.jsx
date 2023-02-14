import React, { useContext, useEffect, useState } from "react";
import { addNewCampaign, editCampaign } from "../../services/campaign.services";
import "./createCampaign.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";
import { CampaignsSourceContext } from "../../context/campaignsSource.context";

export const CreateCampaignComponent = () => {
  const [Code, setCode] = useState(null);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Description, setDescription] = useState("");
  const [LandingPageURL, setLandingPageURL] = useState("");
  const [HashTag, setHashTag] = useState("");
  const [MyImage, setMyImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { setSource } = useContext(CampaignsSourceContext);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (location.state && location.state.Campaign) {
      const { Campaign } = location.state;
      setCode(Campaign.Code);
      setName(Campaign.Name);
      setEmail(Campaign.Email);
      setDescription(Campaign.Description);
      setLandingPageURL(Campaign.Landing_Page_URL);
      setHashTag(Campaign.HashTag);
      setMyImage(Campaign.Image);
      setIsEdit(true);
    }
  }, []);

  const { user } = useAuth0();

  const notify_seccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notify_error = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCampaign = {
      Code,
      Name,
      Email,
      Description,
      LandingPageURL,
      HashTag,
      MyImage,
    };

    if (
      Name === "" ||
      Email === "" ||
      Description === "" ||
      LandingPageURL === "" ||
      Email === "" ||
      MyImage === ""
    ) {
      notify_error("Please fill all fields");
    } else {
      if (!isEdit) addNewCampaign(newCampaign, user.email);
      else if (isEdit) editCampaign(newCampaign);

      notify_seccess("Campain was successully uploaded");
      await sleep(5000);
      setSource("NPOCampaigns");
      navigate("/all-campaigns");
    }
  };

  return (
    <div className="CreateCampaign--form-container form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="frm-lbl">
            Campaign Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={Name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="frm-lbl">
            Campaign Email Address:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="frm-lbl">
            Campaign Description:
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            value={Description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="landingPageURL" className="frm-lbl">
            Campaign Landing Page URL:
          </label>
          <input
            type="text"
            className="form-control"
            id="landingPageURL"
            value={LandingPageURL}
            onChange={(event) => setLandingPageURL(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hashTag" className="frm-lbl">
            Campaign HashTag:
          </label>
          <input
            type="text"
            className="form-control"
            id="hashTag"
            value={HashTag}
            onChange={(event) => setHashTag(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="myImage" className="frm-lbl">
            Campaign Image (URL):
          </label>
          <input
            type="text"
            className="form-control"
            id="myImage"
            value={MyImage}
            onChange={(event) => setMyImage(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};
