import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoleManagerComponent } from "../RoleManager/roleManager.component";
import { useAuth0 } from "@auth0/auth0-react";
import "./statusbar.css";
import { RoleContext } from "../../context/role.context";
import { getPendding } from "../../services/user.services";
import { CampaignsSourceContext } from "../../context/campaignsSource.context";
import { SyncLoader } from "react-spinners";
import { RoleComponent } from "../Role/role.component";
// import { updateTwitterData } from "../../services/twitter.services";
export const StatusbarComponent = (props) => {
  const { role } = useContext(RoleContext);
  const { setSource } = useContext(CampaignsSourceContext);
  const { user } = useAuth0();
  const [pendding, setPendding] = useState("");
  const [spinner, setSpinner] = useState(true);

  const handlePendding = async () => {
    const result = await getPendding(user.email);
    if (result === null) {
      setPendding(false);
    } else if (result === false) {
      setPendding(true);
    }
  };

  useEffect(() => {
    handlePendding();
    // updateTwitterData();
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  }, []);

  return (
    <div className="Statusbar--statusbar-container statusbar-container">
      <ul className="statusbar-menu">
        {spinner && (
          <li>
            <h1>
              <RoleManagerComponent />
              <SyncLoader color="#fff39e" />
            </h1>
          </li>
        )}
        {!spinner && (
          <>
            {" "}
            <li>
              <label className="Link-lbl">
                <RoleManagerComponent />
                <RoleComponent />
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
                      your request to join us has been received in the system
                      and will be approved soon
                    </p>
                  </label>
                </li>
              </>
            )}
            {role === "Owner" && (
              <>
                <li>
                  <Link to="/reports">
                    <label className="Link-lbl">Reports</label>
                  </Link>
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
                  <Link
                    to="/all-campaigns"
                    onClick={() => setSource("NPOCampaigns")}
                  >
                    <label className="Link-lbl">My Campagins</label>
                  </Link>
                </li>
              </>
            )}
            {role === "BC" && (
              <>
                <li>
                  <Link
                    to="/all-campaigns"
                    onClick={() => setSource("BCCampaigns")}
                  >
                    <label className="Link-lbl">Products Pannel</label>
                  </Link>
                </li>
                <li>
                  <Link to="/order-manager">
                    <label className="Link-lbl">Orders Manager</label>
                  </Link>
                </li>
              </>
            )}
            {role === "SA" && (
              <>
                <li>
                  <Link
                    to="/all-campaigns"
                    onClick={() => setSource("SACampaigns")}
                  >
                    <label className="Link-lbl">Make A Donation</label>
                  </Link>
                </li>
                <li>
                  <Link to="/my-donations">
                    <label className="Link-lbl">My Donations</label>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-picture"
                />
                <label className="Link-lbl">Profile</label>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
