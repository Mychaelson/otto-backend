const axios = require("axios");

const API_URL = "https://phoenix-imkas.ottodigital.id";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

module.exports = axiosInstance;
