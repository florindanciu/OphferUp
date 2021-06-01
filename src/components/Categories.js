import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Card } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";

const Categories = ({ length }) => {
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
        <Card.Link key={cat.id} href={`/items/category/${cat.id}`}>
          {cat.enumCategory === "Vehicles" ? (
            <Avatar src="/auto.png" id="categories-avatar" />
          ) : cat.enumCategory === "Electronics" ? (
            <Avatar src="/electronics.png" id="categories-avatar" />
          ) : cat.enumCategory === "Fashion" ? (
            <Avatar src="/fashion.png" id="categories-avatar" />
          ) : cat.enumCategory === "Home" ? (
            <Avatar src="/home.png" id="categories-avatar" />
          ) : cat.enumCategory === "Jobs" ? (
            <Avatar src="/jobs.jpeg" id="categories-avatar" />
          ) : cat.enumCategory === "Pets" ? (
            <Avatar src="/pets.png" id="categories-avatar" />
          ) : cat.enumCategory === "Estates" ? (
            <Avatar src="/estates.png" id="categories-avatar" />
          ) : cat.enumCategory === "Services" ? (
            <Avatar src="/services.png" id="categories-avatar" />
          ) : (
            ""
          )}
          {cat.enumCategory}
        </Card.Link>
      ));

  return (
    <Card style={{ textAlign: "center", marginBottom: "50px" }}>
      <h3>Categories</h3>
      <Card.Body className="category-link">{categoriesToDisplay}</Card.Body>
    </Card>
  );
};

export default Categories;
