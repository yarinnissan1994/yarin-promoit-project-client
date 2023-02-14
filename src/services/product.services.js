import axios from "axios";

const ServerUrl = "http://localhost:7240/api/products";

export const getProducts = async () => {
  try {
    let result = await axios.get(`${ServerUrl}/get-products`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve Products");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getOrders = async () => {
  try {
    let result = await axios.get(`${ServerUrl}/get-orders`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve Orders");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const approveOrderShipped = async (orderCode) => {
  try {
    await axios.post(`${ServerUrl}/post-order-shipped/${orderCode}`);
  } catch (error) {
    console.error(error);
  }
};

export const addNewCampaignProduct = async (NewProduct, UserEmail) => {
  try {
    await axios.post(
      `${ServerUrl}/post-new-campaign-product/${UserEmail}`,
      NewProduct
    );
  } catch (error) {
    console.error(error);
  }
};

export const editCampaignProduct = async (UpdatedProduct) => {
  try {
    await axios.post(
      `${ServerUrl}/post-updated-campaign-product`,
      UpdatedProduct
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateDonateDetails = async (NewOrder, Quantity) => {
  try {
    await axios.post(`${ServerUrl}/post-donate-details/${Quantity}`, NewOrder);
  } catch (error) {
    console.error(error);
  }
};

// export const getProducts = async () => {
//   let result = await axios.get(`${ServerUrl}/get-products`);
//   if (result.status === 200) {
//     return result.data;
//   } else {
//     return null;
//   }
// };

// export const getOrders = async () => {
//   let result = await axios.get(`${ServerUrl}/get-orders`);
//   if (result.status === 200) {
//     return result.data;
//   } else {
//     return null;
//   }
// };

// export const approveOrderShipped = async (orderCode) => {
//   await axios.post(`${ServerUrl}/post-order-shipped/${orderCode}`);
// };

// export const addNewCampaignProduct = async (NewProduct, UserEmail) => {
//   await axios.post(
//     `${ServerUrl}/post-new-campaign-product/${UserEmail}`,
//     NewProduct
//   );
// };

// export const editCampaignProduct = async (UpdatedProduct) => {
//   await axios.post(
//     `${ServerUrl}/post-updated-campaign-product`,
//     UpdatedProduct
//   );
// };

// export const updateDonateDetails = async (NewOrder, Quantity) => {
//   await axios.post(`${ServerUrl}/post-donate-details/${Quantity}`, NewOrder);
// };
