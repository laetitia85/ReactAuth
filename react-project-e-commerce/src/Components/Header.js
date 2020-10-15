import { BrowserRouter as Router } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
const jwt = require("jsonwebtoken");

class Header extends Component {
  constructor() {
    super();
    this.state = {
      picture_profil: null,
    };
  }
  render() {
    if (localStorage.getItem("myToken")) {
      return (
        <Router>
          <div>
            <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/user">Profil</Nav.Link>

              <Nav.Link href="/productslist">Products</Nav.Link>

              <Nav.Link href="/createproducts">Add Product</Nav.Link>
              </Nav>
              <Nav>
              <Nav.Link href="/user">
                <img
                  height="40px"
                  width="40px"
                  alt=""
                  src={this.state.picture_profil}/>
              </Nav.Link>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control size="sm"
                  as="select"
                
                  // placeholder="Please choose a category"
                ><option valeur="category">Please choose a category</option>
                  <option valeur="bijoux">Bijoux</option>
                  <option valeur="accessoires">Accessoires</option>
                  <option valeur="vetements">Vetements</option>
                  <option valeur="chaussures">Chaussures</option>
                </Form.Control>
              </Form.Group>
         
              <Nav.Link href="/">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.signOut.bind(this)}>
                  SignOut
                </Button>
              </Nav.Link>
              </Nav>
            </Navbar>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <Navbar bg="dark" variant="dark">
              <Nav>
              <Nav.Link href="/">Home</Nav.Link>

              <Nav.Link href="/sign-up">Sign-up</Nav.Link>

              <Nav.Link href="/sign-in">Sign-in</Nav.Link>
              </Nav>
            </Navbar>
          </div>
        </Router>
      );
    }
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("myToken");
      const decodeToken = jwt.verify(token, "x_TOKEN_SECRET");
      const userId = decodeToken.id;

      let result = await axios.get(`http://localhost:8000/users/${userId}`);
      // console.log(result)
      this.setState({ picture_profil: result.data[0].picture_profil });
      // console.log(result.data[0].picture_profil)
    } catch (err) {
      console.log(err);
    }
  }
  signOut() {
    localStorage.removeItem("myToken");

  }
}

export default Header;
