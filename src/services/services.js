import axios from "axios";

const ServerUrl = "http://localhost:7240/api/service";

export const getRoles = async (userId) => {
  try {
    let result = await axios.get(`${ServerUrl}/get-role/${userId}`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve Roles");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
