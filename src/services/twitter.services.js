import axios from "axios";

const ServerUrl = "http://localhost:7240/api/twitter";

export const postDonationTweet = async (DonationTweetDetails) => {
  try {
    await axios.post(`${ServerUrl}/post-donation-tweet`, DonationTweetDetails);
  } catch (error) {
    console.error(error);
    return null;
  }
};
