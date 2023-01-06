import React from "react";
import { useNavigate } from "react-router-dom";
import "./registerationType.css";

export const RegisterationTypeComponent = () => {
  const navigate = useNavigate();
  const handleRegister = (role) => {
    navigate("/registerarion-form", {
      state: {
        role,
      },
    });
  };

  return (
    <>
      <h1 className="register-header">Who are You?</h1>
      <div className="card-container">
        <div className="card">
          <img
            src="https://miro.medium.com/max/1200/1*WQlvxGQtWTjXWyVcn7F0Xw.jpeg"
            className="card-img-top card-img"
            alt="Non Profit Organization"
          />
          <div className="card-body">
            <h5 className="card-title">Non Profit Organization</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister("NPO")}
            >
              Register
            </button>
          </div>
        </div>
        <div className="card">
          <img
            src="https://blog.ipleaders.in/wp-content/uploads/2018/03/BV-Acharya.jpg"
            className="card-img-top card-img"
            alt="Buisness Company"
          />
          <div className="card-body">
            <h5 className="card-title">Buisness Company</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister("BC")}
            >
              Register
            </button>
          </div>
        </div>
        <div className="card">
          <img
            src="data:image/jpeg;base64,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"
            className="card-img-top card-img"
            alt="Social Activist"
          />
          <div className="card-body">
            <h5 className="card-title">Social Activist</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleRegister("SA")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
