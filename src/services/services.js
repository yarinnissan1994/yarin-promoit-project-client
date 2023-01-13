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

export const getUserInfo = async (Email, Role) => {
  let result = await axios.get(`${ServerUrl}/get-user-info/${Email}/${Role}`);
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
    return result.data;
  } else {
    return null;
  }
};

export const getCampaigns = async () => {
  let result = await axios.get(`${ServerUrl}/get-campaigns`);
  if (result.status === 200) {
    return result.data;
  } else {
    return null;
  }
};

export const getProducts = async () => {
  let result = await axios.get(`${ServerUrl}/get-products`);
  if (result.status === 200) {
    return result.data;
  } else {
    return null;
  }
};

export const getOrders = async () => {
  let result = await axios.get(`${ServerUrl}/get-orders`);
  if (result.status === 200) {
    return result.data;
  } else {
    return null;
  }
};

export const approveOrderShipped = async (orderCode) => {
  await axios.post(`${ServerUrl}/post-order-shipped/${orderCode}`);
};

export const approveUserPendding = async (userCode) => {
  await axios.post(`${ServerUrl}/post-approve-user/${userCode}`);
};

export const addUser = async (User, UserType) => {
  await axios.post(`${ServerUrl}/post-user-create/${UserType}`, User);
};

export const addUserMessage = async (UserMessage) => {
  await axios.post(`${ServerUrl}/post-user-message`, UserMessage);
};

export const addNewCampaign = async (NewCampaign, UserEmail) => {
  await axios.post(`${ServerUrl}/post-new-campaign/${UserEmail}`, NewCampaign);
};

export const editCampaign = async (updatedCampaign) => {
  await axios.post(`${ServerUrl}/post-updated-campaign`, updatedCampaign);
};

export const toggleCampaignIsActive = async (campaignCode) => {
  await axios.post(`${ServerUrl}/post-campaign-is-active/${campaignCode}`);
};

export const addNewCampaignProduct = async (NewProduct, UserEmail) => {
  await axios.post(
    `${ServerUrl}/post-new-campaign-product/${UserEmail}`,
    NewProduct
  );
};

export const editCampaignProduct = async (UpdatedProduct) => {
  await axios.post(
    `${ServerUrl}/post-updated-campaign-product`,
    UpdatedProduct
  );
};

export const updateDonateDetails = async (NewOrder, Quantity) => {
  await axios.post(`${ServerUrl}/post-donate-details/${Quantity}`, NewOrder);
};

export const updateSAMoneyStatus = async (MoneyStatus, SACode) => {
  await axios.post(`${ServerUrl}/post-sa-money-status/${SACode}`, MoneyStatus);
};
