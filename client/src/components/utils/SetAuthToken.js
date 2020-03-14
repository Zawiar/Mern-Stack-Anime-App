import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply to each request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    ///delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
