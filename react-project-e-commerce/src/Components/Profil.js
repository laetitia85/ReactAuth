import React, { Component } from "react";
import axios from "axios";
import { Button, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteProduct} from "../store/actions/products";
import { changeUserData } from "../store/actions/users";
// import EditProducts from "../Components/EditProducts"
import { Redirect } from 'react-router-dom'


class Profil extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      picture_profil: "",
      product_name: [],
      products_id: [],
      flag : false,
      msg: '',
    };
  }
  render() {
    if(this.state.flag === false) {
    return (
      <div className="container">
        <h1>Edit your profile {this.props.name}</h1>
        <hr></hr>
        <span className="ingredient">
          {this.state.message}
          <br />
        </span>
        <Form>
          <Row>
            <Col sm={10}>
              <Form.Label className="float-left">Name</Form.Label>
              <Form.Control
                value={this.state.name}
                onChange={this.setChange.bind(this)}
                name="name"
                placeholder="Enter your name"
              />
               </Col>
               <Col sm={2}>
                 <Button
            className="Button"
            variant="primary"
            type="submit"
            onClick={this.tryToUpdate.bind(this)}>
            Change Name
          </Button>
            </Col>
            </Row>
            <Row>
            <Col sm={10}>
              <Form.Label className="float-left">Email address</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.setChange.bind(this)}
                name="email"
                placeholder="Enter  email"
              />
              </Col>
              <Col sm={2}>
                 <Button
            className="Button"
            variant="primary"
            type="submit"
            onClick={this.tryToUpdate.bind(this)}>
          Change Email
          </Button>
            </Col>
          </Row>

          <Row>
            <Col sm={5}>
              <Form.Label className="float-left">Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                onChange={this.setChange.bind(this)}
                name="password"
                placeholder="Password"
              />
            </Col>
            <Col sm={5}>
              <Form.Label className="float-left">Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
              </Col>
              <Col sm={2}>
              <Button
            className="Button"
            variant="primary"
            type="submit"
            onClick={this.tryToUpdate.bind(this)}>
          Change Password
          </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={10}>
              <Form.Label className="float-left">Profile Picture</Form.Label>
              <Form.Control
                value={this.state.picture_profil}
                onChange={this.setChange.bind(this)}
                name="picture_profil"
                placeholder="Enter your profile picture link's"
              />
                </Col>
              <Col sm={2}>
                 <Button
            className="Button"
            variant="primary"
            type="submit"
            onClick={this.tryToUpdate.bind(this)}>
          Change Picture
          </Button>
            </Col>
          </Row>
        </Form>
        <p>{this.state.msg}</p>
        <h5>Your Products</h5>
        <hr></hr>
        <div>
          {this.props.userProducts.map((product) => {
            return (
              <Row key={product.products_id}>
                <Col sm={1}>{product.name}</Col>
                <Col sm={3}>{product.description}</Col>
                <Col sm={2}>{product.category}</Col>
                <Col sm={2}>
                  <img src={product.picture} alt="" height="30" width="30" />
                </Col>
                <Col sm={1}>{product.price}</Col>
                <Col sm={1}>
                  <Button 
                    className="Button"
                    variant="primary"
                    type="submit"
                    onClick={this.edit.bind(this, product.products_id)}>
                    Edit
                  </Button>
                </Col>
                <Col sm={2}>
                  <Button 
                    className="Button"
                    variant="primary"
                    type="submit"
                    onClick={this.deleteProduct.bind(this, product.products_id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
          )
        })
      }
        </div>
      </div>
    )} else if (this.state.flag) {
     return (
        //  <EditProducts id = {this.state.products_id} />
      <Redirect to={`/editproducts/${this.state.products_id}`} />

     
     
     )
    }
  }
  setChange(event) {
    let myinput = event.target;
    let inputname = myinput.name;
    let value = myinput.value;
    this.setState({
      [inputname]: value,
    });
  }
  async tryToUpdate(e) {
    e.preventDefault();
    //console.log('my data' , this.state.name + this.state.email + this.state.password + this.state.picture_profil)
    try {
      let userData = {name:this.state.name, email: this.state.email, password:this.state.password, picture_profil:this.state.picture_profil}
      for (let key in userData) {
        if(userData[key] === '') {
          delete userData[key]
        }
      }
      if (userData) {
        let result = await axios.put(
          `http://localhost:8000/users/${this.props.id}`, userData )
        console.log(result);
        if (result.status === 200) {
          this.props.changeUserData(userData)
          this.setState({
            name: "",
            email: "",
            password: "",
            picture_profil: "",
            message: "Your data has been changed",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  edit (productId) {
    this.setState({ products_id : productId , flag : true}) // n'oublie pas d'ajouter un objet dedans
    };

  async deleteProduct (productId) {
    try {
    let result = await axios.delete(`http://localhost:8000/products/${productId}`)
    if (result.status === 200) {
      this.setState({msg : 'Your product have been delete'})
      this.props.deleteProduct(productId)
    }
      
    
    } catch (error) {
      console.log(error);
    }
  };

  // async componentDidMount() {
  //   try {
  //     let result = await axios.get(
  //       `http://localhost:8000/users/${this.props.id}`
  //     );
  //     this.setState({
  //       name: result.data[0].user_name,
  //     });

  //     for (let i = 0; i < result.data.length; i++) {
  //       let oneProduct = {
  //         name: result.data[i].name,
  //         price: result.data[i].price,
  //         category: result.data[i].category,
  //         description: result.data[i].description,
  //         picture: result.data[i].picture,
  //         id: result.data[i].products_id,
  //       };
  //       this.props.filluserProducts(oneProduct);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}

const mapStateToProps = (state) => ({
  userProducts: state.productsReducer.userProducts,
  id: state.usersReducer.id,
  name: state.usersReducer.name,
  email: state.usersReducer.email,
});
const mapDispatchToProps = {
  deleteProduct,
  changeUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
