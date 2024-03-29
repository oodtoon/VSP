import axios from "axios";

const resetUrl = process.env.NODE_ENV === "development" ?' http://localhost:3001/api/password-reset' : `${process.env.SERVER_URL}/api/password-reset`;

const sendUserResetLink = async (userObject) => {
  try {
    const response = await axios.post(resetUrl, userObject);
    return response.data.message;
  } catch (error) {
    return error;
  }
};

const updateUserPassword = async (url, passwordObject) => {
  try {
    const response = await axios.post(url, passwordObject)
    return response
  } catch (error) {
    console.log(error)
    return error.message
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { sendUserResetLink, updateUserPassword };