import React from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams();
  return <div>TODO create details design page for item with id: {itemId}</div>;
};

export default ItemDetails;
