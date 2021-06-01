import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://localhost:5000/api/v1/`;

const getCoordinates = (params) => {
  return axios.get("http://api.positionstack.com/v1/forward", { params });
};

const getItemsContent = () => {
  return axios.get(API_URL + "items");
};

const addItem = (userId, item) => {
  return axios.post(API_URL + `items/${userId}`, item, {
    headers: authHeader(),
  });
};

const updateItem = (itemId, item) => {
  return axios.put(API_URL + `items/item/${itemId}`, item, {
    headers: authHeader(),
  });
};

const uploadImages = (itemId, formData) => {
  return axios.post(API_URL + `items/image/${itemId}/upload`, formData, {
    headers: authHeader(),
  });
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
  return axios.get(API_URL + `items/user/item/${itemId}`);
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

const getUserProfile = (userId) => {
  return axios.get(API_URL + `routes/user/${userId}`, {
    headers: authHeader(),
  });
};

const getSellerProfile = () => {
  return axios.get(API_URL + "routes/seller", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "routes/admin", { headers: authHeader() });
};

const deleteItem = (itemId) => {
  return axios.delete(API_URL + `items/${itemId}`, { headers: authHeader() });
};

export default {
  getCoordinates,
  getItemsContent,
  addItem,
  updateItem,
  uploadImages,
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
  deleteItem,
};
