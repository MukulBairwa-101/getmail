import { useState } from "react";

import axios from "axios";

const useHelper = () => {
  const { REACT_APP_SERVER_HOST } = process.env;

  const [response, setResponse] = useState(null);

  const request = (method, path, data, head) => {
    let url = `${REACT_APP_SERVER_HOST}${path}`;
    let headers = { ...head };

    const config = {
      method,
      headers,
      url,
      data,
    };
    axios(config)
      .then(async (res) => {
        setResponse(res.data);
      })
      .catch((err) => {});
  };

  return { request, response };
};
export default useHelper;
