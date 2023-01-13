import React, { useEffect, useState } from "react";
import { approveUserPendding, getPenddingList } from "../../services/services";
import { ToastContainer, toast } from "react-toastify";
import "./userManager.css";

export const UserManagerComponent = () => {
  const [penddingList, setPenddingList] = useState([]);

  const getUserDataFromDB = async () => {
    let res = await getPenddingList();
    setPenddingList(res);
  };

  useEffect(() => {
    getUserDataFromDB();
  }, []);

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

  const handleApprove = async (user) => {
    await approveUserPendding(user.Code);
    notify_seccess(user.Name + " has been approved");
    await getUserDataFromDB();
  };

  return (
    <div className="UserManager--my-tbl my-tbl">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role Request</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {penddingList &&
            penddingList.map((user) => {
              return (
                <tr>
                  <th scope="row">{user.Name}</th>
                  <td>{user.Email}</td>
                  <td>{user.Role_Request}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleApprove(user);
                      }}
                    >
                      Approve
                    </button>
                    <ToastContainer />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
