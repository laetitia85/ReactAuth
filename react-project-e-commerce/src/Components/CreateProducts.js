import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios  from 'axios' 
import {connect} from 'react-redux'
import {addProducts} from '../store/actions/products'
// const jwt = require("jsonwebtoken");

class CreateProducts extends Component {
  constructor(){
    super();
    this.state= {
      name:'',
      idUser: '',
      category:'',
      price:'',
      description:'',
      picture: '',
      message: '',
    }
  }
  render() {
    return (
      <div> <span className="ingredient">{this.state.message}<br/></span>
      <div className="container">
         
        <Form>
          <Row>
            <Col sm={6}>
              <Form.Label className="float-left">Product Name</Form.Label>
              <Form.Control  value={this.state.name} onChange={this.setChange.bind(this)} name="name" placeholder="Enter your product name" />
            </Col>
            <Col sm={6}>
              <Form.Label className="float-left">Short Description</Form.Label>
              <Form.Control value={this.state.description} onChange={this.setChange.bind(this)} name="description" placeholder="Enter a short description" />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Label className="float-left">Category</Form.Label>
              <Form.Control value={this.state.category} onChange={this.setChange.bind(this)} name="category" placeholder="Enter a Category" />
            </Col>
            <Col sm={6}>
              <Form.Label className="float-left">Price</Form.Label>
              <Form.Control value={this.state.price} onChange={this.setChange.bind(this)} name="price" placeholder="Price of the product" />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Form.Label className="float-left">Picture Link</Form.Label>
              <Form.Control value={this.state.picture} onChange={this.setChange.bind(this)} name="picture" placeholder="Link to the picture" />
            </Col>
          </Row>

          <Button className ="Button" variant="primary" type="submit" onClick={this.tryToAdd.bind(this)}>
            Add
          </Button>
        </Form>
        </div>
        </div>
        
    );
  }
  setChange(event){
    let myinput = event.target
    let inputname = myinput.name
    let value = myinput.value
    this.setState({
        [inputname]: value 
     });
  }
  async tryToAdd(e) {
    e.preventDefault();
    console.log('my data' , this.state.name + this.state.category + this.state.price + this.state.description + this.state.picture)
      try {
        let userId = (this.props.id);
        console.log(this.props.id)
        // const decodeToken = jwt.verify(token, "x_TOKEN_SECRET");
        // const userId = decodeToken.id;

        let result = await axios.post(`http://localhost:8000/products`, {name:this.state.name, idUser: userId, category:this.state.category, price:this.state.price, description:this.state.description, picture:this.state.picture})
        console.log(result);
          if(result.status === 200){

            let y= {
              name: this.state.name,
              category: this.state.category,
              price: this.state.price,
              description: this.state.description,
              picture: this.state.picture,
            }
            this.props.addProducts(y)





        this.setState({
          name: '',
          category:'',
          price:'',
          description:'',
          picture: '',
          message: 'You add a product',
        }) 
      }
      } catch (error) {
        this.setState({
          name:'',
          category:'',
          price:'',
          description:'',
          picture:'',
          message: 'Something wrong',

        })
          console.log(error);
      }
  }
}

const mapStateToProps = (state) => ({
  id: state.usersReducer.id,
  userProducts: state.productsReducer.userProducts,

})

const mapDispatchToProps = {
 addProducts,

}

export default connect (mapStateToProps, mapDispatchToProps)(CreateProducts);
