import React, { Component } from 'react';
import axios  from 'axios' //il faut l'installer
//import { Redirect } from "react-router-dom";//il faut l'installer
import { Button, Form } from 'react-bootstrap'

class SignIn extends Component {
  constructor(){
    super();
    this.state= {
      email:'',
      password:'',
      message: '',
      redirect: null,
    }
  }
  render() {
    return (
      <div className="container">
        <span className="ingredient">{this.state.message}<br/></span>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="float-left">Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.setChange.bind(this)} name="email"/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
           </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="float-left">Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.setChange.bind(this)} name="password"/>
          </Form.Group>
          <Button className ="Button" variant="primary" type="submit" onClick={this.tryToSignIn.bind(this)}>Sign In</Button>
        </Form>
        </div>
    )
    
    
}
  setChange(event){
    let myinput = event.target
    let inputname = myinput.name
    let value = myinput.value
    this.setState({
        [inputname]: value 
     });
  }
  //---------Call API
  async tryToSignIn(e) {
  e.preventDefault();
  console.log('my datat: ' , this.state.email + this.state.password)
    try {
      let result = await axios.post(`http://localhost:8000/users/sign-in`, {email:this.state.email, password: this.state.password})
    console.log(result);
        if(result.status === 200){
      console.log('Sign is good', result.data.token);
      localStorage.setItem('myToken', result.data.token);
      this.setState({
        token : result.data.token,
        redirect: '/productlist',
        email:'',
       password:'',
       message: '',
      }) 
    }else if(result.status === 205){
      this.setState({
        message: 'PLEASE TRY AGAIN',
        email:'',
        password:'',
      }) 
    }  
    } catch (error) {
      this.setState({
        message: 'We do not know this user',
        email:'',
        password:'',
      })
      console.log(error);
    }
}
 
  // async test(e) { 
  //   e.preventDefault();
  //   
  //   try {
  //       let result = await axios.get(`http://localhost:8000/users`)
  //        console.log(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  
  //   this.setState({
  //       email:'',
  //       passwoard:'',     
  //  });
  // } 
  
}

export default SignIn;