import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import {
  Col,
  Row,
  Image,
  Container,
  Button,
  Carousel,
  Card,
} from "react-bootstrap";
import { scroller } from "react-scroll";
import Map from "./Map";
import Location from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Geocode from "react-geocode";
import DisplayOffers from "../utils/DisplayOffers";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [callButton, setCallButton] = useState("Call Seller");
  const [callColorButton, setCallColorButton] = useState("dark");
  const [user, setUser] = useState([]);
  const [lat, setLat] = useState(1);
  const [lng, setLng] = useState(1);

  useEffect(() => {
    async function fetchdata() {
      const itemResponse = await UserService.getItemById(itemId);
      setItem(itemResponse.data);
      // const params = {
      //   access_key: "b653616f996cbf8503d3b57729670a32",
      //   query: itemResponse.data.location,
      // };
      // const coordinatesResponse = await UserService.getCoordinates(params);
      // setLat(coordinatesResponse.data.data[0].latitude);
      // setLng(coordinatesResponse.data.data[0].longitude);
    }
    fetchdata();
    getMoreItems();
  }, [itemId]);

  {
    /* - Convert addresses to coordinates -
  Geocode.setApiKey("AIzaSyDFX8yu7eMqVvh9AC4u7r2wEYaCbKZnPCA");
  const coordinatesResponse = await Geocode.fromAddress(itemResponse.data.location);
  const { latitude, longitude } = coordinatesResponse.results[0].geometry.location;
  setLat(latitude);
  setLng(longitude);
  */
  }

  // const getMoreItems = async () => {
  //   const userResponse = await UserService.getUserByItemId(itemId);
  //   console.log(userResponse.data);
  //   // setUser(userResponse.data);
  //   // const moreItemsResponse = await UserService.getItemsByUserId(user.id);
  //   // setItems(moreItemsResponse.data);
  // };

  const getMoreItems = () => {
    UserService.getUserByItemId(itemId).then((response) => {
      console.log(response.data.id);
      UserService.getItemsByUserId(response.data.id).then((itemsResponse) => {
        setItems(itemsResponse.data);
      });
    });
  };

  console.log(user);

  const scrollToSection = () => {
    scroller.scrollTo("message", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const images = [
    `http://localhost:5000/api/v1/items/image/${itemId}/file1/download`,
    `http://localhost:5000/api/v1/items/image/${itemId}/file2/download`,
    `http://localhost:5000/api/v1/items/image/${itemId}/file3/download`,
  ];

  const handleCallButton = (phoneNumber) => {
    setCallButton(phoneNumber);
    setCallColorButton("outline-dark");
  };

  const handleMoreOffersButton = () => {
    if (showMoreOffers) {
      console.log("f");
      setShowMoreOffers(false);
    } else {
      console.log("t");
      setShowMoreOffers(true);
    }
  };

  return (
    <Container style={{ marginTop: "80px" }}>
      {showMoreOffers ? (
        <Row>
          <Col>
            <DisplayOffers items={items} loading={false} />
          </Col>
        </Row>
      ) : (
        ""
      )}
      <Row>
        <Col md={8} style={{ marginTop: "20px" }}>
          <Carousel>
            {images.map((image) => (
              <Carousel.Item>
                <Image
                  className="d-block w-100"
                  src={image}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col>
          <Row style={{ padding: "15px" }}>
            <h5>
              <strong>Seller: </strong>
              {item.contactPerson}
            </h5>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-dark"
                block
                onClick={handleMoreOffersButton}
              >
                More offers from this seller
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                style={{ width: "48%" }}
                onClick={() => {
                  handleCallButton(item.phoneNumber);
                }}
                type="text"
                variant={callColorButton}
              >
                <PhoneIcon /> {callButton}
              </Button>
              <Button
                style={{ width: "48%" }}
                onClick={scrollToSection}
                variant="dark"
              >
                <MailOutlineIcon style={{ fontSize: 25 }} /> Send message
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row style={{ marginTop: "20px" }}>
                <Col>
                  <Location color="primary"></Location> {item.location}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  {lat && lng ? (
                    <Map
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFX8yu7eMqVvh9AC4u7r2wEYaCbKZnPCA&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `244px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      lat={lat}
                      lng={lng}
                    />
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ paddingTop: "20px" }}>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <InfoOutlinedIcon fontSize="large" /> {item.itemName}
              </Card.Title>
              <hr />
              {item.description}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Row style={{ padding: "10px" }}>
                  <Col>
                    <MailOutlineIcon /> {item.contactEmail}
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <PhoneIcon /> {item.phoneNumber}
                  </Col>
                </Row>
              </Card.Title>
              <textarea
                style={{ marginBottom: "15px" }}
                placeholder="  Write your message..."
                className="message"
              ></textarea>
              <Row>
                <Col />
                <Col md={4}>
                  <Button variant="dark" block>
                    {"Send"}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default ItemDetails;
