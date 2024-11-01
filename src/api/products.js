import axios from "axios";
import { PRODUCTS } from "./config";

export const fetchProducts = async (params = {}) => {
  try {
    const response = await axios({
      method: "get",
      baseURL: PRODUCTS,
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchSingleProduct = async (params = {}) => {
  try {
    const productId = params.id;
    const response = await axios({
      method: "get",
      baseURL: PRODUCTS + `/${productId}`,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
