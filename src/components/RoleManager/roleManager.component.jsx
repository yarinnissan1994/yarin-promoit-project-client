import { useAuth0 } from "@auth0/auth0-react";
import { getRoles, getUserInfo } from "../../services/services";
import React, { useContext, useEffect } from "react";
import { RoleContext } from "../../context/role.context";
import { UserInfoContext } from "../../context/userInfo.context";

export const RoleManagerComponent = (props) => {
  const { role, setRole } = useContext(RoleContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { user } = useAuth0();

  const handleRoles = async () => {
    let userId = user.sub;
    let roleArray = await getRoles(userId);
    if (Object.keys(roleArray).length === 0) {
      setRole("");
    } else {
      let roleString = roleArray[0].name;
      setRole(roleString);
    }
  };

  const handleUserInfo = async () => {
    if (role === "NPO" || role === "BC" || role === "SA") {
      let userInfoArray = await getUserInfo(user.email, role);
      setUserInfo(userInfoArray[0]);
    }
  };

  useEffect(() => {
    handleRoles();
  }, []);

  useEffect(() => {
    handleUserInfo();
  }, [role]);

  return (
    <div>
      {role}
      <br />
      {role === "SA" && userInfo.Money_Status + "$"}
    </div>
  );
};
