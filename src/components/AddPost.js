import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";
import { Col, Row, Alert, Button } from "react-bootstrap";
import Control from "react-bootstrap/Form";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const AddPost = () => {
  const { userId } = useParams();
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  // const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [successfull, setSuccessfull] = useState("");
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

  const handleAddForm = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessfull("");

    UserService.addItem(
      userId,
      itemName,
      category,
      description,
      contactEmail,
      contactPerson,
      location,
      phoneNumber,
      price
    ).then(
      (response) => {
        setMessage(response.data);
        setSuccessfull("true");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setMessage(resMessage);
        setSuccessfull("false");
      }
    );
  };

  const Dropzone = () => {
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(
          `http://localhost:5000/api/v1/items/image/${userId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          console.log("File uploaded successfuly");
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Input
            type="text"
            className="input-box"
            name="image"
            placeholder="Drop image here..."
          />
        ) : (
          <Input
            type="text"
            className="input-box"
            name="image"
            placeholder="Drag 'n' drop images here, or click to browse images"
          />
        )}
      </div>
    );
  };

  const notification = () => {
    if (successfull === "true") {
      return <Alert variant="success">{message}</Alert>;
    } else if (successfull === "false") {
      return <Alert variant="warning">{message}</Alert>;
    }
  };

  return (
    <div>
      {userId === "undefined" ? (
        <>
          <Alert
            variant="success"
            style={{ textAlign: "center", marginTop: "25%" }}
          >
            <Alert.Heading>
              <h5>Please login first in order to add an offer!</h5>
            </Alert.Heading>

            <hr />
            <div className="d-flex justify-content-end">
              <Button href="/login" variant="outline-success">
                Go to LOGIN
              </Button>
            </div>
          </Alert>
        </>
      ) : (
        <React.Fragment>
          <h2>Add offer</h2>
          {notification()}
          <Form onSubmit={handleAddForm}>
            <Row>
              <Col>
                <Input
                  placeHolder="Item name"
                  type="text"
                  className="input-box"
                  name="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Col>
              <Col>
                <Control
                  className="input-box"
                  as="select"
                  size="lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option aria-label="None" value="">
                    Category
                  </option>
                  {categories.map((category) => {
                    return (
                      <option value={category.enumCategory}>
                        {category.enumCategory}
                      </option>
                    );
                  })}
                </Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Control
                  as="textarea"
                  style={{ height: "200px" }}
                  type="text"
                  placeholder="Description"
                  className="input-box"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  type="text"
                  className="input-box"
                  name="contactEmail"
                  placeholder="Contact email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  className="input-box"
                  name="contactPerson"
                  placeholder="Contact person"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Dropzone />
              </Col>
              <Col>
                <Input
                  type="text"
                  className="input-box"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  type="text"
                  className="input-box"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  className="input-box"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "30px" }}>
              <Col>
                <Button
                  style={{ marginRight: "10px" }}
                  type="submit"
                  variant="primary"
                >
                  Submit
                </Button>
                <Link type="button" to="/profile">
                  <Button variant="danger">Cancel</Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </React.Fragment>
      )}
    </div>
  );
};

export default AddPost;
