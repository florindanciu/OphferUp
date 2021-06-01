import React from "react";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import { Col, Row } from "react-bootstrap";
import Icon from "@material-ui/icons/Search";
import Location from "@material-ui/icons/LocationOn";

const SearchInput = ({ setName, setLocation, length }) => {
  return (
    <div>
      <Form>
        <Row>
          <Col>
            <div className="input-box">
              <Icon></Icon>
              <Input
                className="search-input"
                placeholder={length + " Current offers"}
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
    </div>
  );
};

export default SearchInput;
