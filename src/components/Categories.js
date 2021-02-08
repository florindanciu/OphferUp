import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Card } from "react-bootstrap";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserService.getCategories().then(
      (response) => {
        setLoading(false);
        setCategories(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setCategories(_content);
      }
    );
  }, []);

  const categoriesToDisplay = loading
    ? "Loading..."
    : categories.map((cat) => (
        <button
          key={cat.id}
          className="category-button"
          onClick={() => (window.location.href = `/items/category/${cat.id}`)}
        >
          {cat.enumCategory}
        </button>
      ));

  return (
    <Card style={{ textAlign: "center", marginBottom: "50px" }}>
      <h3>Categories</h3>
      <Card.Body>{categoriesToDisplay}</Card.Body>
    </Card>
  );
};

export default Categories;
