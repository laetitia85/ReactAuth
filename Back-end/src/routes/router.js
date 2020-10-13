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
      `INSERT INTO users (name,email,password,picture_profil) VALUES ('${req.body.name}','${req.body.email}','${passwordHash}','${req.body.picture_profil}')`
    );
  });
  res.status(200).send("the user is enregistered");
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
            res.status(200).json({ auth: true, token: token });
          } else {
         
            res.status(205).send({
              msg: "Sorry it is not the same password",
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
    sql.query("SELECT id, name, price, picture FROM products", (err, response) => {
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
    sql.query(`SELECT users.id, users.name AS user_name, users.email, users.password, users.picture_profil , products.name FROM users INNER JOIN products ON products.idUser = users.id WHERE products.idUser = ${req.params.id}`, (err, result) => {
        
        if (err) {
            throw err;
          }
          res.json(result);
        });
      });

app.get('/products/:id', (req,res) => {
    sql.query(`SELECT products.id, products.name AS products_name, products.idUser, products.price, products.category, products.description, products.picture , users.name FROM products INNER JOIN users ON users.id = products.idUser WHERE products.id = ${req.params.id}`, (err, result) => {
            
        if (err) {
                throw err;
              }
            res.send(result);
            });
          });



module.exports = app;
