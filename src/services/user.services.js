import axios from "axios";

const ServerUrl = "http://localhost:7240/api/users";

export const getUserInfo = async (Email, Role) => {
  try {
    let result = await axios.get(`${ServerUrl}/get-user-info/${Email}/${Role}`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve User Info");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPenddingList = async () => {
  try {
    let result = await axios.get(`${ServerUrl}/get-pendding-list`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve Pendding List");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPendding = async (email) => {
  try {
    let result = await axios.get(`${ServerUrl}/get-pendding/${email}`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve Penddings");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const approveUserPendding = async (userCode) => {
  try {
    await axios.post(`${ServerUrl}/post-approve-user/${userCode}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUser = async (User, UserType) => {
  try {
    await axios.post(`${ServerUrl}/post-user-create/${UserType}`, User);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addUserMessage = async (UserMessage) => {
  try {
    await axios.post(`${ServerUrl}/post-user-message`, UserMessage);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateSAMoneyStatus = async (MoneyStatus, SACode) => {
  try {
    await axios.post(
      `${ServerUrl}/post-sa-money-status/${SACode}`,
      MoneyStatus
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMyDonations = async (SACode) => {
  try {
    let result = await axios.get(`${ServerUrl}/get-my-donations/${SACode}`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve My Donations");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
