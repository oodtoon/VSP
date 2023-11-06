import axios from "axios";

const userUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/users"
    : `${process.env.SERVER_URL}/api/users`;

const createUser = async (userObject) => {
  try {
    const response = await axios.post(userUrl, userObject);
    return response.data;
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser };
