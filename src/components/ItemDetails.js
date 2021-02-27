import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import { Col, Row, Image, Container, Button } from "react-bootstrap";
import { scroller } from "react-scroll";
import Map from "./Map";
import Location from "@material-ui/icons/LocationOn";

import Geocode from "react-geocode";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
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

  const scrollToSection = () => {
    scroller.scrollTo("message", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <Container style={{ marginTop: "80px" }}>
      <Row>
        <Col style={{ padding: "15px" }}>
          <Image src={item.image} rounded />
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
              <Button variant="outline-dark" block>
                More offers from this seller
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col>
              <Button type="text" variant="outline-dark" block>
                {item.phoneNumber}
              </Button>
            </Col>
            <Col>
              <Button onClick={scrollToSection} variant="dark" block>
                Send message
              </Button>
            </Col>
          </Row>

          <Row style={{ marginTop: "30px" }}>
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
                  containerElement={<div style={{ height: `237px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  lat={lat}
                  lng={lng}
                />
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <textarea className="message"></textarea>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default ItemDetails;
