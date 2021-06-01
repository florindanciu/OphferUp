import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import { Col, Row, Alert, Button } from "react-bootstrap";
import Control from "react-bootstrap/Form";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const OfferForm = ({
  handleForm,
  onChangeHandler,
  item,
  categories,
  onChangeFileHandler,
  handleCancel,
}) => {
  return (
    <Form onSubmit={handleForm}>
      <Row>
        <Col md={5}>
          <Row>
            <Col>
              <Input
                required
                placeholder="Item name"
                type="text"
                className="input-box"
                name="itemName"
                value={item.itemName}
                onChange={onChangeHandler}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Control
                // required
                className="input-box"
                name="category"
                as="select"
                size="lg"
                value={item.category}
                onChange={onChangeHandler}
              >
                <option aria-label="None" value="">
                  Category
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.enumCategory}>
                      {category.enumCategory}
                    </option>
                  );
                })}
              </Control>
            </Col>
          </Row>
        </Col>
        <Col>
          <Control
            required
            as="textarea"
            style={{ height: "174px" }}
            type="text"
            placeholder="Description"
            className="input-box"
            name="description"
            value={item.description}
            onChange={onChangeHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            required
            type="text"
            className="input-box"
            name="contactEmail"
            placeholder="Contact email"
            value={item.contactEmail}
            onChange={onChangeHandler}
          />
        </Col>
        <Col>
          <Input
            required
            type="text"
            className="input-box"
            name="contactPerson"
            placeholder="Contact person"
            value={item.contactPerson}
            onChange={onChangeHandler}
          />
        </Col>
        <Col>
          <Input
            required
            type="text"
            className="input-box"
            name="location"
            placeholder="Location"
            value={item.location}
            onChange={onChangeHandler}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Input
                required
                type="text"
                className="input-box"
                name="phoneNumber"
                placeholder="Phone number"
                value={item.phoneNumber}
                onChange={onChangeHandler}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                required
                type="text"
                className="input-box"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={onChangeHandler}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row style={{ marginTop: "30px" }}>
            <Col>
              <Input
                // required
                type="file"
                name="file1"
                onChange={onChangeFileHandler}
              />
              <hr />
              <Input
                // required
                type="file"
                name="file2"
                onChange={onChangeFileHandler}
              />
              <hr />
              <Input
                // required
                type="file"
                name="file3"
                onChange={onChangeFileHandler}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: "15px" }}>
        <Col style={{ textAlign: "center" }}>
          <Button
            style={{ marginRight: "10px" }}
            type="submit"
            variant="primary"
          >
            Submit
          </Button>
          {handleCancel === "/" ? (
            <Button href={handleCancel} variant="danger">
              Cancel
            </Button>
          ) : (
            <Button onClick={handleCancel} variant="danger">
              Cancel
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default OfferForm;
