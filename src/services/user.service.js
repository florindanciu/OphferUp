import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://localhost:5000/api/v1/`;

const getItemsContent = () => {
  return axios.get(API_URL + "items");
};

const getItemsByCategory = (categoryId) => {
  return axios.get(API_URL + `items/category/${categoryId}`);
};

const getCategories = () => {
  return axios.get(API_URL + "categories");
};

const getCategoryById = (categoryId) => {
  return axios.get(API_URL + `categories/${categoryId}`);
};

const getItemsByName = (itemName) => {
  return axios.get(API_URL + `items/${itemName}`);
};

const getItemsByLocation = (itemLocation) => {
  return axios.get(API_URL + `items/${itemLocation}`);
};

const getItemsByNameAndLocation = (itemName, itemLocation) => {
  return axios.get(API_URL + `items/name/${itemName}/location/${itemLocation}`);
};

const getPublicContent = () => {
  return axios.get(API_URL + "routes/all");
};

const getUserProfile = () => {
  return axios.get(API_URL + "routes/user", { headers: authHeader() });
};

const getSellerProfile = () => {
  return axios.get(API_URL + "routes/seller", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "routes/admin", { headers: authHeader() });
};

export default {
  getItemsContent,
  getItemsByName,
  getItemsByLocation,
  getItemsByNameAndLocation,
  getCategories,
  getCategoryById,
  getItemsByCategory,
  getPublicContent,
  getUserProfile,
  getSellerProfile,
  getAdminBoard,
};
