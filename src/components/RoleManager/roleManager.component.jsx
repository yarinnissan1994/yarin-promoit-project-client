import { useAuth0 } from "@auth0/auth0-react";
import { getRoles } from "../../services/services";
import React, { useContext, useEffect } from "react";
import { RoleContext } from "../../context/role.context";

export const RoleManagerComponent = (props) => {
  const { role, setRole } = useContext(RoleContext);
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

  useEffect(() => {
    handleRoles();
  }, []);

  return <div>{role}</div>;
};
