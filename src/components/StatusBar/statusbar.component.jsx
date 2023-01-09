import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoleManagerComponent } from "../RoleManager/roleManager.component";
import { useAuth0 } from "@auth0/auth0-react";
import "./statusbar.css";
import { RoleContext } from "../../context/role.context";
import { getPendding } from "../../services/services";

export const StatusbarComponent = (props) => {
  const { role } = useContext(RoleContext);
  const { user } = useAuth0();
  const [pendding, setPendding] = useState(false);

  useEffect(() => {
    handlePendding();
  }, []);

  const handlePendding = async () => {
    const result = await getPendding(user.email);
    if (result === null) {
      setPendding(false);
    } else if (result === false) {
      setPendding(true);
    }
  };

  return (
    <div className="Statusbar--statusbar-container statusbar-container">
      <ul className="statusbar-menu">
        <li>
          <label className="Link-lbl">
            <RoleManagerComponent />
          </label>
        </li>
        {role === "" && !pendding && (
          <>
            <li>
              <Link to="/register">
                <label className="Link-lbl">
                  Click Here To Finish Registeration
                </label>
              </Link>
            </li>
          </>
        )}
        {role === "" && pendding && (
          <>
            <li>
              <label className="Link-lbl">
                <h4>We are almost there</h4>
                <p>
                  your request to join us has been received in the system and
                  will be approved soon
                </p>
              </label>
            </li>
          </>
        )}
        <li>
          <Link to="/">
            <img src={user.picture} alt={user.name} className="user-picture" />
            <label className="Link-lbl">Profile</label>
          </Link>
        </li>
        {role === "Owner" && (
          <>
            <li>
              <label className="Link-lbl">Campaign Report</label>
            </li>
            <li>
              <label className="Link-lbl">Users Report</label>
            </li>
            <li>
              <label className="Link-lbl">Tweeter Report</label>
            </li>
            <li>
              <Link to="/user-manager">
                <label className="Link-lbl">User Manager</label>
              </Link>
            </li>
          </>
        )}
        {role === "NPO" && (
          <>
            <li>
              <Link to="/new-campaign">
                <label className="Link-lbl">New Campaign</label>
              </Link>
            </li>
            <li>
              <label className="Link-lbl">Campagin Report</label>
            </li>
          </>
        )}
        {role === "BC" && (
          <>
            <li>
              <label className="Link-lbl">New Product</label>
            </li>
            <li>
              <label className="Link-lbl">Orders Report</label>
            </li>
          </>
        )}
        {role === "SA" && (
          <>
            <li>
              <label className="Link-lbl">Campaigns Products</label>
            </li>
            <li>
              <label className="Link-lbl">Products i Donated</label>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
