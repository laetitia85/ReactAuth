import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

class AddProducts extends Component {
  render() {
    return (
      <div className="container">
        <Form>
          <Row>
            <Col sm={10}>
              <Form.Label class="float-left">Product Name</Form.Label>
              <Form.Control placeholder="Enter your product name" />
            </Col>
            <Col sm={10}>
              <Form.Label class="float-left">Short Description</Form.Label>
              <Form.Control placeholder="Enter a short description" />
            </Col>
          </Row>
          <Row>
            <Col sm={10}>
              <Form.Label class="float-left">Category</Form.Label>
              <Form.Control placeholder="Enter a Category" />
            </Col>
            <Col sm={10}>
              <Form.Label class="float-left">Price</Form.Label>
              <Form.Control placeholder="Price of the product" />
            </Col>
          </Row>
          <Row>
            <Col sm={20}>
              <Form.Label class="float-left">Picture Link</Form.Label>
              <Form.Control placeholder="Link to the picture" />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddProducts;
