import axios from "axios";

// Set config defaults when creating the instance
const BaseUrl = axios.create({
  baseURL: "http://52.47.211.2:82/",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default BaseUrl;

