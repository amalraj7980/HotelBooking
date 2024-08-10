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
      "Access-Control-Allow-Origin": "*", // Add CORS header
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
    // body:body
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Add CORS header
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
      "Access-Control-Allow-Origin": "*", // Add CORS header
    },
  });
};


// export const BookHotelApiCall = (params) => {
//   return onApiCall({
//     url: API_BASE_URL + `/fuelup/store/pumps/${params.storeNumber}`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*", // Add CORS header
//       lat: params.lat,
//       lon: params.lon,
//     },
//   });
// };


export const fuelTransactionApiCall = (body) => {
  return onApiCall({
    url: API_BASE_URL + `/transactions`,
    method: "POST",
    // body:body
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Add CORS header
    },
    data: JSON.stringify({
      ...body,
    }),
  });
};

export const TriggerFuelingTransationByIdApiCall = (body, params) => {
  return onApiCall({
    url: API_BASE_URL + `/transactions/${params.transationId}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Add CORS header
    },
    data: JSON.stringify({
      ...body,
    }),
  });
};

export const GetFuelTransationReceiptApiCall = (params) => {
  return onApiCall({
    url:
      API_BASE_URL + `/transactions/${params.transactionId}/receipt`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Add CORS header
    },
  });
};

export const getCompleteTransationReceiptStatusApiCall = (params) => {
  return onApiCall({
    url:
      API_BASE_URL + `/transactions/${params.transactionId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Add CORS header
    },
  });
};