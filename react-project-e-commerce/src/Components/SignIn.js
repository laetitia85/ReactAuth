import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'

class SignIn extends Component {
  render() {
    return (
      <div className="container">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label class="float-left">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
           </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label class="float-left">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className ="Button" variant="primary" type="submit">SignIn</Button>
        </Form>
      </div>
    );
  }
}

export default SignIn;