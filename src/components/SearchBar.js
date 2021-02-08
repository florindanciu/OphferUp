import React, { useState, useEffect, useMemo } from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import { Col, Row } from "react-bootstrap";
import { Card, CardColumns, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import Icon from "@material-ui/icons/Search";
import Location from "@material-ui/icons/LocationOn";

const SearchBar = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const data = props.items;
  const loading = props.loading;

  const filteredResults = useMemo(() => {
    if (!name && !location) {
      return data;
    } else if (name && !location) {
      return data.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
      });
    } else if (!name && location) {
      return data.filter((item) => {
        return item.location.toLowerCase().includes(location.toLowerCase());
      });
    } else {
      return data.filter((item) => {
        return (
          item.name.toLowerCase().includes(name.toLowerCase()) &&
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      });
    }
  }, [name, location, data]);

  const items = loading
    ? "Loading..."
    : filteredResults.map((item) => (
        <Card key={item.id}>
          <Link to={`/details/${item.id}`}>
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

  const inputSearch = (
    <Form>
      <Row>
        <Col>
          <div className="input-box">
            <Icon></Icon>
            <input
              className="search-input"
              placeholder="Search for offers"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Col>
        <Col>
          <div className="input-box">
            <Location></Location>
            <input
              className="search-input"
              placeholder="Everywhere"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </Col>

        {/* <Col>
          <button type="submit" className="input-button">
            Search
          </button>
        </Col> */}
      </Row>
    </Form>
  );

  return (
    <div>
      {inputSearch}
      <Categories />
      <h3 style={{ textAlign: "center" }}>All Offers</h3>
      <CardColumns>{items}</CardColumns>
    </div>
  );
};

export default SearchBar;
