import axios from "axios";

const getTokenInCookie = () => {
  return localStorage.getItem("token") ?? "";
};

// Add a request interceptor
axios.interceptors.request.use(
  function (request) {
    const token = getTokenInCookie();

    console.log("OLD " + request.headers["Content-Type"]);
    // Đính token vào header mới
    const newHeaders = {
      ...request.headers,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": request.headers["Content-Type"] || "application/json",
      Authorization: token,
    };
    console.log("NEW " + newHeaders["Content-Type"]);

    // Đính header mới vào lại request trước khi được gửi đi
    request = {
      ...request,
      headers: newHeaders,
    };

    return request;
  },
  function (error) {
    // Xử lý lỗi
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
