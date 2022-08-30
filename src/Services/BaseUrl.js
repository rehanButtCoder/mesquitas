import axios from "axios";

// Set config defaults when creating the instance
const BaseUrl = axios.create({
  baseURL: "https://mesquitasapi.jinnbytedev.com",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default BaseUrl;

