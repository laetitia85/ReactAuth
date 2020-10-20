import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { connect } from 'react-redux'
import {signOutUser} from '../store/actions/users'

// const jwt = require("jsonwebtoken");


class Header extends Component {
  constructor() {
    super();
    this.state = {
      picture_profil: null,
    };
  }
  render() {
    if (this.props.token) {
      return (
          <div>
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/user">Profil</Nav.Link>

                <Nav.Link as={Link} to="/productslist">Products</Nav.Link>

                <Nav.Link as={Link} to="/createproducts">Add Product</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/user">
                  <img
                    height="40px"
                    width="40px"
                    alt=""
                    src={this.state.picture_profil} />
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

                <Nav.Link as={Link} to="/">
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
      );
    } else if (this.props.token == null){
      return (
          <div>
            <Navbar bg="dark" variant="dark">
              <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>

                <Nav.Link as={Link} to="/sign-up">Sign-up</Nav.Link>

                <Nav.Link as={Link} to="/sign-in">Sign-in</Nav.Link>
              </Nav>
            </Navbar>
          </div>
      );
    }
  }

  // async componentDidMount() {

  async componentDidUpdate(prevProps) {
    // if(this.props.token) {


    if (this.props.id !== prevProps.id) {
      try {
       // let userId = (this.props.id);
        // const decodeToken = jwt.verify(token, "x_TOKEN_SECRET");
        // const userId = decodeToken.id;

        let result = await axios.get(`http://localhost:8000/users/${this.props.id}`);
        this.setState({ picture_profil: result.data[0].picture_profil });
      } catch (err) {
        console.log(err);
        // }
      }
    }

  }
  signOut() {
    this.props.signOutUser()

  }
}

const mapStateToProps = (state) => ({
  token: state.usersReducer.token,
  id: state.usersReducer.id,

})
const mapDispatchToProps = {
  signOutUser,

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
