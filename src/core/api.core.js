/**
 * General API call function for the app
 * Allowed actions: POST, GET, PUT, DELETE
 */
import axios from "axios";

const BASE_ENDPOINT = "";

const APIConnect = async (url, method, data = null, token = null) => {
  try {
    const response = await axios({
      method,
      baseURL: BASE_ENDPOINT,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(`This is the:: ${error}`);
  }
};

export default APIConnect;
