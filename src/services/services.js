import axios from "axios";

const ServerUrl = "http://localhost:7240/api/service";

export const getRoles = async (userId) => {
  let result = await axios.get(`${ServerUrl}/get-role/${userId}`);
  if (result.status === 200) {
    return result.data;
  } else {
    return null;
  }
};

export const getPenddingList = async () => {
  let result = await axios.get(`${ServerUrl}/get-pendding-list`);
  if (result.status === 200) {
    return result.data;
  } else {
    return null;
  }
};

export const getPendding = async (email) => {
  let result = await axios.get(`${ServerUrl}/get-pendding/${email}`);
  if (result.status === 200) {
    console.log(result.data);
    console.log(email);
    return result.data;
  } else {
    return null;
  }
};

export const approveUserPendding = async (userCode) => {
  await axios.post(`${ServerUrl}/post-approve-user/${userCode}`);
};

export const addUser = async (User, UserType) => {
  await axios.post(`${ServerUrl}/post-user-create/${UserType}`, User);
};
