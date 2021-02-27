import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://localhost:5000/api/v1/`;

const getCoordinates = (params) => {
  return axios.get("http://api.positionstack.com/v1/forward", { params });
};

const getItemsContent = () => {
  return axios.get(API_URL + "items");
};

const addItem = (
  userId,
  itemName,
  category,
  description,
  contactEmail,
  contactPerson,
  image,
  location,
  phoneNumber,
  price
) => {
  return axios.post(
    API_URL + `items/${userId}`,
    {
      itemName,
      category,
      description,
      contactEmail,
      contactPerson,
      image,
      location,
      phoneNumber,
      price,
    },
    { headers: authHeader() }
  );
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

const getItemById = (itemId) => {
  return axios.get(API_URL + `items/${itemId}`);
};

const getUserByItemId = (itemId) => {
  return axios.get(`items/user/item/${itemId}`);
};

const getItemsByUserId = (userId) => {
  return axios.get(API_URL + `items/user/${userId}`);
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
  getCoordinates,
  getItemsContent,
  addItem,
  getItemsByName,
  getItemById,
  getUserByItemId,
  getItemsByUserId,
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
