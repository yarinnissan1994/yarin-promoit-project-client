import React, { useContext } from "react";
import { RoleContext } from "../../context/role.context";
import { UserInfoContext } from "../../context/userInfo.context";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import KeyIcon from "@mui/icons-material/Key";
import BusinessIcon from "@mui/icons-material/Business";
import Diversity1Icon from "@mui/icons-material/Diversity1";

export const RoleComponent = () => {
  const { role } = useContext(RoleContext);
  const { userInfo } = useContext(UserInfoContext);
  return (
    <div>
      <h3>
        {role} {role === "Owner" && <KeyIcon />}
        {role === "NPO" && <VolunteerActivismIcon />}
        {role === "BC" && <BusinessIcon />}
        {role === "SA" && <Diversity1Icon />}
      </h3>
      <br />
      <b>{role === "SA" && "Balance: " + userInfo.Money_Status + "$"}</b>
    </div>
  );
};
