import axios from "axios";

const ServerUrl = "http://localhost:7240/api/twitter";

export const postDonationTweet = async (DonationTweetDetails) => {
  await axios.post(`${ServerUrl}/post-donation-tweet`, DonationTweetDetails);
};

export const updateTwitterData = async () => {
  await axios.get(`${ServerUrl}/get-twitter-updater`);
};
