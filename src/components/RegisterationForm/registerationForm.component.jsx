import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser } from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "./RegisterationForm.css";

export const RegisterationFormComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth0();

  const { role } = location.state;

  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [websiteUrl, setWebsiteUrl] = useState("Enter Website URL Here");
  const [address, setAddress] = useState("Future Shiping Address");
  const [phone, setPhone] = useState("Phone Number");
  const [image, setImage] = useState("Image URL");

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
    if (
      fullName === "" ||
      email === "" ||
      websiteUrl === "" ||
      address === "" ||
      phone === ""
    ) {
      notify_error("Please fill all fields");
    } else {
      if (role === "NPO") {
        const NPOUser = {
          Name: fullName,
          Email: email,
          WebsiteURL: websiteUrl,
          MyImage: image,
        };
        console.log(NPOUser);
        await addUser(NPOUser, role);
        notify_seccess(
          "Your Request has been recived in the system and will be aproved soon!"
        );
        await sleep(5000);
        navigate("/");
      } else if (role === "BC") {
        const BCUser = {
          Name: fullName,
          Email: email,
          MyImage: image,
        };
        console.log(BCUser);
        await addUser(BCUser, role);
        notify_seccess(
          "Your Request has been recived in the system and will be aproved soon!"
        );
        await sleep(5000);
        navigate("/");
      } else if (role === "SA") {
        const SAUser = {
          Name: fullName,
          Email: email,
          Address: address,
          PhoneNumber: phone,
          MyImage: image,
        };
        console.log(SAUser);
        await addUser(SAUser, role);
        notify_seccess(
          "Your Request has been recived in the system and will be aproved soon!"
        );
        await sleep(5000);
        navigate("/");
      }
    }
  };

  // const handleImg = (file) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const arrayBuffer = reader.result;
  //     const bitArray = new Uint8Array(arrayBuffer);
  //     setImage(bitArray);
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  const handleReturn = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log(role);
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="full-name">Full Name:</label>
        <input
          type="text"
          id="full-name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        {role === "NPO" && (
          <>
            <label htmlFor="websiteURL">Organization Website:</label>
            <input
              type="text"
              id="websiteURL"
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
            />
            <br />
          </>
        )}
        {role === "SA" && (
          <>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <br />
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <br />
          </>
        )}
        {/* <label htmlFor="image-upload">Select an image:</label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={(event) => handleImg(event.target.files[0])}
        /> */}
        <label htmlFor="image-upload">Enter an image URL:</label>
        <input
          type="text"
          id="image-upload"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
        <br />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <ToastContainer />
        <button className="btn btn-danger" onClick={handleReturn}>
          Return
        </button>
      </form>
    </div>
  );
};
