import axios from "axios";

export const getRoles = async (userId) => {
  let result = await axios.get(
    `http://localhost:7240/api/service/get-role/${userId}`
  );
  if (result.status === 200) {
    return result.data;
  } else {
    return null;
  }
};

export const getPendding = async (email) => {
  let result = await axios.get(
    `http://localhost:7240/api/service/get-pendding/${email}`
  );
  if (result.status === 200) {
    console.log(result.data);
    console.log(email);
    return result.data;
  } else {
    return null;
  }
};
