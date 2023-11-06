require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI
const BASE_URL = process.env.BASE_URL
const APP_URL = process.env.APP_URL

const USER = process.env.EMAIL_USER
const PASS = process.env.EMAIL_PASS
const HOST = process.env.EMAIL_HOST
const SERVICE = process.env.EMAIL_SERVICE

module.exports = {
    MONGODB_URI,
    BASE_URL,
    APP_URL,
    PORT,
    USER,
    PASS,
    HOST,
    SERVICE
}