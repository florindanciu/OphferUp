import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemsTable from "../utils/ItemsTable";
import USER_SERVICE from "../services/user.service";
import AUTH_SERVICE from "../services/auth.service";
import EditItem from "./EditItem";

const Profile = () => {
  const { userId } = useParams();
  const [user] = useState(AUTH_SERVICE.getCurrentUser());
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selection_itemId, setSelection_itemId] = useState([]);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getItems();
  }, []);

  const handleDelete = async () => {
    const response = await USER_SERVICE.deleteItem(selection_itemId);
    setMessage(response.data);
    getItems();
  };

  const handleEdit = () => {
    if (edit) {
      setEdit(false);
      window.location.reload();
    } else {
      setEdit(true);
    }
  };

  const getItems = async () => {
    setIsLoading(true);
    const response = await USER_SERVICE.getItemsByUserId(userId);
    setItems(response.data);
    setIsLoading(false);
  };

  return edit ? (
    <EditItem itemId={selection_itemId} handleEdit={handleEdit} />
  ) : (
    <ItemsTable
      items={items}
      selection_itemId={selection_itemId}
      setSelection_itemId={setSelection_itemId}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Profile;
