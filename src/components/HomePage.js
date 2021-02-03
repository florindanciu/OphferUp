import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { Card, CardColumns, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserService.getItemsContent().then(
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
  }, []);

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

  const categoriesToDisplay = loading
    ? "Loading..."
    : categories.map((cat) => (
        <Link to={`/items/category/${cat.id}`} key={cat.id}>
          <Badge
            style={{ padding: "8px", marginRight: "10px" }}
            pill
            variant="dark"
          >
            {cat.enumCategory}
          </Badge>
        </Link>
      ));

      console.log(categoriesToDisplay)

  return (
    <div>
      <Card style={{ textAlign: "center", marginBottom: "50px" }}>
        <h3>Categories</h3>
        <Card.Body>
          {categoriesToDisplay}
        </Card.Body>
      </Card>
      <h3 style={{ textAlign: "center" }}>All Offers</h3>
      <CardColumns>{textToDisplay}</CardColumns>
    </div>
  );
};

export default Home;
