const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
// const isTokenIsValid = require('../middlewares/auth');

app.get("/users", (req, res) => {
  sql.query("SELECT id, name FROM users", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

app.post("/users/sign-up", (req, res) => {
    try{
  bcrypt.hash(req.body.password, saltRounds).then(function (passwordHash) {
    sql.query(
      `INSERT INTO users (name,email,password,picture) VALUES ('${req.body.name}','${req.body.email}','${passwordHash}','${req.body.picture}')`
    );
  });
  res.send("the user is enregistered");
}catch (err) {
    console.log(err)
}
});

app.post("/users/sign-in", (req, res) => {
  sql.query(
    `SELECT * FROM users WHERE email = '${req.body.email}'`,
    (err, result) => {
      if (result[0]) {
        bcrypt.compare(req.body.password, result[0].password, function (
          erro,
          resultat
        ) {
   
          if (resultat) {
         
            let token = jwt.sign(
              { id: result[0].id, email: result[0].email },
              "x_TOKEN_SECRET",
              {
                expiresIn: 86400, // expires in 24 hours
              }
            );
            res.status(200).send({ auth: true, token: token });
          } else {
         
            res.status(405).send({
              msg: "Sorry",
            });
          }
        });
      } else {
        res.status(406).send({
          msg: "Sorry, we don't know this user",
        });
      }
    }
  );
});

app.get('/products',(req,res) => {
    sql.query("SELECT id, name, price FROM products", (err, response) => {
        if (err) {
          throw err;
        }
        res.send(response);
      });
    });

app.post('/products', (req,res) => {
    try{
    sql.query(
        `INSERT INTO products (name,idUser,price,category,description,picture) VALUES ('${req.body.name}','${req.body.idUser}','${req.body.price}','${req.body.category}','${req.body.description}','${req.body.picture}')`
      );
    
    res.send("the product is been enregistered");
}catch (err) {
    console.log(err)
}
});

app.get('/users/:id', (req,res) => {
    sql.query('SELECT * FROM users WHERE id')
})



module.exports = app;
