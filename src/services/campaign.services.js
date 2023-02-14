import axios from "axios";

const ServerUrl = "http://localhost:7240/api/campaigns";

export const getCampaigns = async () => {
  try {
    let result = await axios.get(`${ServerUrl}/get-campaigns`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve Campaigns");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addNewCampaign = async (NewCampaign, UserEmail) => {
  try {
    console.log(NewCampaign, UserEmail);
    await axios.post(
      `${ServerUrl}/post-new-campaign/${UserEmail}`,
      NewCampaign
    );
  } catch (error) {
    console.error(error);
  }
};

export const editCampaign = async (updatedCampaign) => {
  try {
    await axios.post(`${ServerUrl}/post-updated-campaign`, updatedCampaign);
  } catch (error) {
    console.error(error);
  }
};

export const toggleCampaignIsActive = async (campaignCode) => {
  try {
    await axios.post(`${ServerUrl}/post-campaign-is-active/${campaignCode}`);
  } catch (error) {
    console.error(error);
  }
};

// export const getCampaigns = async () => {
//   let result = await axios.get(`${ServerUrl}/get-campaigns`);
//   if (result.status === 200) {
//     return result.data;
//   } else {
//     return null;
//   }
// };

// export const addNewCampaign = async (NewCampaign, UserEmail) => {
//   console.log(NewCampaign, UserEmail);
//   await axios.post(`${ServerUrl}/post-new-campaign/${UserEmail}`, NewCampaign);
// };

// export const editCampaign = async (updatedCampaign) => {
//   await axios.post(`${ServerUrl}/post-updated-campaign`, updatedCampaign);
// };

// export const toggleCampaignIsActive = async (campaignCode) => {
//   await axios.post(`${ServerUrl}/post-campaign-is-active/${campaignCode}`);
// };
