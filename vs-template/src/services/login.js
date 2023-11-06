import axios from 'axios'

const baseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:3001/api/login' : `${process.env.SERVER_URL}/api/login`

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }