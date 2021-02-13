import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/user.service";
import { Col, Row, Image, Container, Button } from "react-bootstrap";
import { scroller } from "react-scroll";
import Map from "./Map";
import axios from "axios";
import Location from "@material-ui/icons/LocationOn";
import Geocode from "react-geocode";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect( () => {
    setLoading(true);
    UserService.getItemById(itemId).then(
      (response) => {
        setLoading(false);
        setItem(response.data);
      }).catch((error) => {
        console.log(error);
      }) 
  }, [itemId]);

  const params = {
    access_key: "b653616f996cbf8503d3b57729670a32",
    query: "Chicago, IL 60659",
  };

  useEffect(() => {
    axios
      .get("http://api.positionstack.com/v1/forward", { params })
      .then((response) => {
        setLat(response.data.data[0].latitude);
        setLng(response.data.data[0].longitude);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [item])

  // Geocode.setApiKey("AIzaSyDFX8yu7eMqVvh9AC4u7r2wEYaCbKZnPCA");

  //   Geocode.fromAddress(item.location).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log(response)
  //       setLat(lat);
  //       setLng(lng);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );

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
              <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDFX8yu7eMqVvh9AC4u7r2wEYaCbKZnPCA&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `60%` }} />}
                lat={lat}
                lng={lng}
              />
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
