import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap'
import axios  from 'axios' 
import { Redirect } from 'react-router-dom'


class SignIn extends Component {

  constructor(){
    super();
    this.state= {
      email:'',
      password:'',
      message: '',
      redirect: false,
    }
  }
  render() {

      if(this.state.redirect === false) {
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
          <Button className ="Button" variant="primary" type="submit" onClick={this.tryToSignIn.bind(this)}>SignIn</Button>
        </Form>
      </div>
      )
    }else {
      return <Redirect to='/user'/>;
     
      
    }
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
  console.log('my data' , this.state.email + this.state.password)
    try {
      let result = await axios.post(`http://localhost:8000/users/sign-in`, {email:this.state.email, password: this.state.password})
    console.log(result);
        if(result.status === 200){
      console.log('Sign is good', result.data.token);
      localStorage.setItem('myToken', result.data.token);
      this.setState({
        token : result.data.token,
        redirect: true,
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
 
}

export default SignIn;