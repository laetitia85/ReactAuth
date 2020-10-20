import React, { Component } from "react";
import axios from "axios";
import { Button, Row, Col, Form } from "react-bootstrap";
import { connect } from 'react-redux'
import { modifyProduct } from '../store/actions/products'
import {filluserProducts} from '../store/actions/products'


// const jwt = require("jsonwebtoken");

class Profil extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: "",
      picture_profil: '',
      product_name: [],
      products_id: [],

    }
  }
  render() {
    return (
      <div className="container">

        <h1>Welcome {this.state.name}</h1>
        <hr></hr>
        <span className="ingredient">{this.state.message}<br/></span>
        <Form>
          <Row>
            <Col sm={6}>
            <Form.Label className="float-left">Name</Form.Label>
              <Form.Control value={this.state.name} onChange={this.setChange.bind(this)} name="name" placeholder="Enter your name" />
            </Col>
            <Col sm={6}>
            <Form.Label className="float-left">Email address</Form.Label>
              <Form.Control  value={this.state.email} onChange={this.setChange.bind(this)} name="email" placeholder="Enter  email" />
            </Col>
            </Row>
           
            <Row>
            <Col sm={6}>
            <Form.Label className="float-left">Password</Form.Label>
              <Form.Control type="password" value={this.state.password} onChange={this.setChange.bind(this)} name="password"placeholder="Paswword" />
            </Col>
            <Col sm={6}>
            <Form.Label className="float-left">Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Row>
          <Row>
         
         <Col sm={12}>
         <Form.Label className="float-left">Profile Picture</Form.Label>
           <Form.Control value={this.state.picture_profil} onChange={this.setChange.bind(this)} name="picture_profil" placeholder="Enter your profile picture link's" />
         </Col>
         </Row>
       
          <Button className ="Button" variant="primary" type="submit"onClick={this.tryToUpdate.bind(this)}>Submit</Button>
        </Form>

        <h5>Infos Produits</h5>
        <hr></hr>
          <Form >
            {this.props.userProducts.map(product =>{
              return (
                <Row key={product.id}>
                <Col sm={1} >
                  {product.name}
                </Col>
                <Col sm={3}>
                  {product.description}
                </Col>
                <Col sm={2} >
                  {product.category}
                </Col>
                <Col sm={2} >
                 <img src={product.picture} alt=""  height="30" width="30"/>
                </Col>
                <Col sm={1} >
                  {product.price}
                </Col>
                <Col sm={1} >
                <Button className="Button" variant="primary" type="submit" onClick={this.edit.bind(this)}>Edit</Button>
                </Col>
                <Col sm={2} >
                <Button className="Button" variant="primary" type="submit" onClick={this.Delete}>Del</Button>
                </Col>
              </Row>
              )
             
           })
          }
           </Form >
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
  async tryToUpdate(e) {
    e.preventDefault();
    //console.log('my data' , this.state.name + this.state.email + this.state.password + this.state.picture_profil)
      try {
        let result = await axios.uptade(`http://localhost:8000/users/${this.props.id}`, {name:this.state.name, email:this.state.email, password:this.state.password,picture_profil:this.state.picture_profil})
      console.log(result);
          if(result.status === 200){
        this.setState({
          name: '',
          email:'',
          password:'',
          picture_profil: '',
          message: 'Your data has been changed',
        }) 
      }
      } catch (error) {
        console.log(error);
      }
    }
  edit = () => {
            this.props.modifyProduct()// n'oublie pas d'ajouter un objet dedans
          }
  async componentDidMount() {
    try {
        // let userId = this.props.id
      //console.log(this.props)
      // const decodeToken = jwt.verify(token, "x_TOKEN_SECRET");
      // const userId = decodeToken.id;

      let result = await axios.get(`http://localhost:8000/users/${this.props.id}`);
      // console.log(userId)
      // console.log(result.data)
       //const tabNameProduct = result.data.map(x => x.name)
      // console.log(tabNameProduct)

      //const tabIdProduct = result.data.map(y => y.products_id)
      // console.log(tabIdProduct)
      this.setState({
          name: result.data[0].user_name
      })
      
      for(let i = 0; i<result.data.length ; i++){
        let oneProduct = {
          name: result.data[i].name,
          price:result.data[i].price,
          category: result.data[i].category,
          description: result.data[i].description,
          picture: result.data[i].picture,
          id:result.data[i].products_id 
        }
        this.props.filluserProducts(oneProduct)
      }
      

      // this.setState({name: result.data[0].user_name, email: result.data[0].email, password:result.data[0].password, picture_profil: result.data[0].picture_profil,  product_name: tabNameProduct, products_id: tabIdProduct });

      // console.log(result.data)


    } catch (err) {
            console.log(err);
    }
  }
}

const mapStateToProps = (state) => ({
  userProducts: state.productsReducer.userProducts,
  id: state.usersReducer.id,
  email: state.usersReducer.email

})
const mapDispatchToProps = {
  modifyProduct,
  filluserProducts,

}

export default connect ( mapStateToProps, mapDispatchToProps)(Profil);