import axios from "axios";

const defaultOptions = {
  baseURL: "http://35.234.131.114/",
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
};

let instance = axios.create(defaultOptions);

export default instance;
