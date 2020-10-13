import React, { Component } from "react";
import "./App.css";
import ConnectedHeader from "./Components/ConnectedHeader";
import Header from "./Components/Header";
import axios from "axios";
const jwt = require("jsonwebtoken");

class App extends Component {
  constructor() {
    super();
    this.state = {
      picture: null,
    };
  }
  render() {
    if (localStorage.getItem("myToken")) {
      return (
        <div className="App">
          <ConnectedHeader />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
        </div>
      );
    }
  }

  async componentDidMount() {
  try {
    let token = localStorage.getItem("myToken");
    const decodeToken = jwt.verify(token, "x_TOKEN_SECRET");
    const userId = decodeToken.id;

    let result = await axios.get(`http://localhost:8000/users/${userId}`);

    this.setState({ picture: result.picture });
  } catch (err) {
    console.log(err);
  }
}


//   componentDidMount() {
//       try {
//     let token = localStorage.getItem("myToken");
//     jwt.verify(token, "x_TOKEN_SECRET", async (err, decoded) => {
//        console.log(decoded)
     
//       let result = await axios
//         .get(`http://localhost:8000/users/${decoded.id}`)
        
//           this.setState({ picture: result.picture })
//       });
// }catch(err){
//   console.log(err);
// }
        

//   }
}


export default App;
