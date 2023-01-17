import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { RoleContext } from "../../context/role.context";
import { UserInfoContext } from "../../context/userInfo.context";
import "./profile.css";

export const ProfilePage = () => {
  const { user } = useAuth0();
  const { role } = useContext(RoleContext);
  const { userInfo } = useContext(UserInfoContext);
  return (
    <div className="profile-container">
      <h1>{user.given_name}`s Profile</h1>
      <img src={user.picture} alt="" />
      <h3>
        <b>Full Name:</b> {user.name}
      </h3>
      <h4>
        <b>Email:</b> {user.email}
      </h4>
      <h4>
        <b>User Type:</b> {role}
      </h4>
      <h5>
        <b>Name On PromoIt System:</b> {userInfo.Name}
      </h5>
      <h5>
        <b>Email On PromoIt System:</b> {userInfo.Email}
      </h5>
    </div>
  );
};
