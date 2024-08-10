import { onApiCall } from "./CommonApi";
import { API_BASE_URL } from "../config";

export const homeApiCall = () => {
  return onApiCall({
    url: API_BASE_URL + `/products`,
    method: "GET",
  });
};
export const singnUpApiCall = (body) => {
  return onApiCall({
    url: API_BASE_URL + `/auth/register`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", 
    },
    data: JSON.stringify({
      ...body,
    }),
  });
};

export const LoginApiCall = (body) => {
  return onApiCall({
    url: API_BASE_URL + `/auth/login`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({
      ...body,
    }),
  });
};
export const BookHotelApiCall = (params) => {
  const url = `${API_BASE_URL}/products/create?id=${encodeURIComponent(params.productId)}&userId=${encodeURIComponent(params.userId)}&date=${encodeURIComponent(params.date)}`;
  console.log("url--->",url)
  return onApiCall({
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", 
    },
  });
};

