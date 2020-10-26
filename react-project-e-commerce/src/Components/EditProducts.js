import React, { Component } from 'react';
import axios from "axios";
import { Button, Row, Col, Form } from "react-bootstrap";

class EditProducts extends Component {
    constructor(){
        super();
        this.state= {
          name:'',
          category:'',
          price:'',
          description:'',
          picture: '',
      }
    }
    render() {
        return (

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
    
              <Button className ="Button" variant="primary" type="submit" onClick={this.tryToEdit.bind(this)}>
                Edit
              </Button>
            </Form>
            </div>
          
         
        );
    }

    setChange(event) {
        let myinput = event.target;
        let inputname = myinput.name;
        let value = myinput.value;
        this.setState({
          [inputname]: value,
        });
}

async tryToEdit(e) {
    e.preventDefault();
    // console.log(this.props.id)
    //console.log('my data' , this.state.name + this.state.email + this.state.password + this.state.picture_profil)
    try {
        let x = this.state;
        for (let key in x) {
            if(x[key] === '') {
                delete x[key]
            }
        }
      if (x) {
        let result = await axios.put(
          `http://localhost:8000/products/${this.props.id}`, x
        );
        console.log(result);
        if (result.status === 200) {
          this.setState({
            name: "",
            category: "",
            description: "",
            price: "",
            picture: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


}
export default EditProducts;