import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addNewCampaignProduct } from "../../services/services";
import "./addCampaignProduct.css";

export const AddCanpaginProductComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unitsInStock, setUnitsInStock] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth0();

  const { Campaign } = location.state;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    const newProduct = {
      Name: name,
      Description: description,
      Price: parseFloat(price),
      UnitsInStock: parseInt(unitsInStock),
      CampaignCode: parseInt(Campaign.Code),
      MyImage: image,
    };
    if (
      name === "" ||
      description === "" ||
      price === "" ||
      unitsInStock === ""
    ) {
      notify_error("Please fill all fields");
    } else {
      addNewCampaignProduct(newProduct, user.email);
      notify_seccess("Campain was successully uploaded");
      await sleep(5000);
      navigate("/all-campaigns");
    }
  };

  return (
    <div className="AddCanpaginProductComponent--form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Units in Stock:
          <input
            type="number"
            value={unitsInStock}
            onChange={(event) => setUnitsInStock(event.target.value)}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};
