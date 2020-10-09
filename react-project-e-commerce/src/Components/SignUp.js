import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

class SignUp extends Component {
  render() {
    return (
      <div className="container">
        <Form>
          <Row>
            <Col sm={6}>
            <Form.Label class="float-left">First Name</Form.Label>
              <Form.Control placeholder="Enter your first name" />
            </Col>
            <Col sm={6}>
            <Form.Label class="float-left">Last Name</Form.Label>
              <Form.Control placeholder="Enter your last name" />
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
            <Form.Label class="float-left">Email address</Form.Label>
              <Form.Control placeholder="Enter  email" />
            </Col>
            <Col sm={6}>
            <Form.Label class="float-left">Profile Picture</Form.Label>
              <Form.Control placeholder="Enter your profile picture link's" />
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
            <Form.Label class="float-left">Password</Form.Label>
              <Form.Control placeholder="Paswword" />
            </Col>
            <Col sm={6}>
            <Form.Label class="float-left">Confirm Password</Form.Label>
              <Form.Control placeholder="Password" />
            </Col>
          </Row>
       
          <Button className ="Button" variant="primary" type="submit">SignUp</Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
