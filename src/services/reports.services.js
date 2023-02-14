import axios from "axios";

const ServerUrl = "http://localhost:7240/api/reports";

export const getOwnerReport = async (reportType) => {
  try {
    let result = await axios.get(`${ServerUrl}/get-report/${reportType}`);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Unable to retrieve Reports");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
