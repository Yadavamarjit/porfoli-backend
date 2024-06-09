import axios from "axios";

export const fetch = async (
  req,
  path,
  data = {},
  headers = {},
  params = {},
  baseUrl
) => {
  const url = baseUrl ?? process.env.REACT_APP_ADMIN_API;
  try {
    const config = {
      method: req,
      url: url + path,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        ...headers,
      },
      params: params,
      data: req !== "GET" ? data : null,
      paramsSerializer: (params) => {
        return Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.status === 401) {
      // Redirect to /login if status code is 401
      localStorage.clear();
      window.location.href = "/login";
      // return;
    }
    throw error;
  }
};
