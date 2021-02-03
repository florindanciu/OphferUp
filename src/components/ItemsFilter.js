import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Card, CardColumns } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ItemsFilter = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("")
  const {categoryId} = useParams();

  useEffect(() => {
    setLoading(true);
    UserService.getItemsByCategory(categoryId).then(
      (response) => {
        setLoading(false);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);
    UserService.getCategoryById(categoryId).then(
      (response) => {
        setLoading(false);
        setCategory(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setCategory(_content);
      }
    );
  }, [categoryId]);
  
  const textToDisplay = loading
    ? "Loading..."
    : content.map((item) => (
        <Card key={item.id}>
          <Link>
            <Card.Img variant="top" src={item.image} />
          </Link>
          <Card.Body>
            <Card.Text>{item.name}</Card.Text>
            <small className="text-muted">
              {item.location} - {item.postingDate}
            </small>

            <Card.Title style={{ marginTop: "20px" }}>
              $ {item.price}
            </Card.Title>
          </Card.Body>
        </Card>
      ));

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>All Offers from {category.enumCategory}</h3>
      <CardColumns>{textToDisplay}</CardColumns>
    </div>
  );
};

export default ItemsFilter;
