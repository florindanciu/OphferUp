import React, { useState, useEffect, useMemo } from "react";
import UserService from "../services/user.service";
import { Card, CardColumns } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import { Col, Row } from "react-bootstrap";
import Icon from "@material-ui/icons/Search";
import Location from "@material-ui/icons/LocationOn";

const ItemsByCategory = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { categoryId } = useParams();
  

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

  const filteredResults = useMemo(() => {
    if (!name && !location) {
      return content;
    } else if (name && !location) {
      return content.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
      });
    } else if (!name && location) {
      return content.filter((item) => {
        return item.location.toLowerCase().includes(location.toLowerCase());
      });
    } else {
      return content.filter((item) => {
        return (
          item.name.toLowerCase().includes(name.toLowerCase()) &&
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      });
    }
  }, [name, location, content]);

  const textToDisplay = loading ? (
    "Loading..."
  ) : filteredResults.length === 0 ? (
    <Card style={{ textAlign: "center", color: "green" }}>No products on this category</Card>
  ) : (
    filteredResults.map((item) => (
      <Card key={item.id}>
        <Link to={`/details/${item.id}`}>
          <Card.Img variant="top" src={item.image} />
        </Link>
        <Card.Body>
          <Card.Text>{item.name}</Card.Text>
          <small className="text-muted">
            {item.location} - {item.postingDate}
          </small>

          <Card.Title style={{ marginTop: "20px" }}>$ {item.price}</Card.Title>
        </Card.Body>
      </Card>
    ))
  );

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        All Offers from {category.enumCategory}
      </h3>
    <Form>
      <Row>
        <Col>
          <div className="input-box">
            <Icon></Icon>
            <Input
              className="search-input"
              placeholder="Search for offers"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Col>
        <Col>
          <div className="input-box">
            <Location></Location>
            <Input
              className="search-input"
              placeholder="Everywhere"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </Form>
      <CardColumns>{textToDisplay}</CardColumns>
    </div>
  );
};

export default ItemsByCategory;
