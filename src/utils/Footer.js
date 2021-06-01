import React from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => (
  <Fragment>
    <div className="footer">
      <hr className="footer-border" />
      <div className="footer-body">
        <Row>
          <Col>
            <p>Contact</p>
            <small>
              nibh tortor id aliquet lectus proin nibh nisl condimentum id
            </small>
          </Col>
          <Col>
            <p>About</p>
            <small>
              tincidunt id aliquet risus feugiat in ante metus dictum at tempor
              commodo ullamcorper a lacus vestibulum
            </small>
          </Col>
          <Col>
            <p>Testimonials</p>
            <small>
              ut tortor pretium viverra suspendisse potenti nullam ac tortor
              vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra
              tellus
            </small>
          </Col>
        </Row>
        <hr />
        <div className="footer-bottom">
          <img src="/logo_nav4.png" alt="opherUp logo" />
          <small>© 2021 OphferUp, Inc.</small>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Footer;
