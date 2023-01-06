import React, { useContext } from "react";
import { RoleContext } from "../../context/role.context";

export const HomePage = () => {
  const { role } = useContext(RoleContext);

  return (
    <div>
      <h1>my Home Page</h1>
      <h1>
        Role:
        {role}
      </h1>
    </div>
  );
};
