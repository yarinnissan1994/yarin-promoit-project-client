import React, { useState } from "react";
import { addUserMessage } from "../../services/user.services";
import "./contactUs.css";
import { ToastContainer, toast } from "react-toastify";

export const ContactUsPage = () => {
  const [Name, setName] = useState("");
  const [Message, setMessage] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const userMessage = { Name, Message, Phone, Email };
    if (Name === "" || Message === "" || Phone === "" || Email === "") {
      notify_error("Please fill all fields");
    } else {
      addUserMessage(userMessage);
      notify_seccess("Message Arraived");
      setEmail("");
      setMessage("");
      setName("");
      setPhone("");
    }
  };

  return (
    <div className="ContactUs--form-container form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="frm-lbl">
            Costumer Name:
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
          <label htmlFor="message" className="frm-lbl">
            Message:
          </label>
          <textarea
            className="form-control"
            id="message"
            value={Message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="frm-lbl">
            Phone Number:
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={Phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="frm-lbl">
            Email Address:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
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
