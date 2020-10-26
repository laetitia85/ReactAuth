const express = require("express");
const app = express.Router();
const sql = require("../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

app.get("/users", (req, res) => {
  sql.query("SELECT id, name FROM users", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

app.post("/users/sign-up", (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds).then(function (passwordHash) {
      sql.query(
        `INSERT INTO users (name,email,password,picture_profil) VALUES ('${req.body.name}','${req.body.email}','${passwordHash}','${req.body.picture_profil}')`
      );
    });
    res.status(200).send("the user is enregistered");
  } catch (err) {
    console.log(err);
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
            res
              .status(200)
              .json({ auth: true, token: token, id: result[0].id });
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

app.get("/products", (req, res) => {
  sql.query(
    "SELECT id, name, price, picture, category FROM products",
    (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    }
  );
});

app.post("/products", (req, res) => {
  try {
    sql.query(
      `INSERT INTO products (name,idUser,price,category,description,picture) VALUES ('${req.body.name}','${req.body.idUser}','${req.body.price}','${req.body.category}','${req.body.description}','${req.body.picture}')`
    );

    res.send("the product is been enregistered");
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/:id", (req, res) => {
  sql.query(
    `SELECT users.id, users.name AS user_name, users.email, users.password, users.picture_profil , products.name, products.id AS products_id, products.price, products.description, products.category, products.picture  FROM users INNER JOIN products ON products.idUser = users.id WHERE products.idUser = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length != 0) {
        res.json(result);
      } else {
        sql.query(
          `SELECT users.name AS user_name, users.email, users.password, users.picture_profil FROM users WHERE users.id = ${req.params.id}`,
          (err, resultat) => {
            if (err) {
              throw err;
            }
            if (resultat) {
              res.json(resultat);
            }
          }
        );
      }
    }
  );
});

app.get("/products/:id", (req, res) => {
  sql.query(
    `SELECT products.id, products.name AS products_name, products.idUser, products.price, products.category, products.description, products.picture , users.name FROM products INNER JOIN users ON users.id = products.idUser WHERE products.id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});

app.get("/category", (req, res) => {
  sql.query("SELECT category FROM products", (err, response) => {
    if (err) {
      throw err;
    }
    res.send(response);
  });
});

// app.get("/products/:category", (req, res) => {
//   try {
//     sql.query(`SELECT name, price FROM products WHERE products.category = '${req.params.category}'`, (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send(result);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/category/:select", (req, res) => {
  sql.query(
    `SELECT * FROM products WHERE products.category = '${req.params.select}'`,
    (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response);
    }
  );
});

app.put("/users/:id", (req, res) => {
  try {
    if (req.body.password) {
      bcrypt.hash(req.body.password, saltRounds).then(function (passwordHash) {
        sql.query(
          `UPDATE users SET password = '${passwordHash}' WHERE id = '${req.params.id}'`
        );
      });
      res.status(200).send("update it's ok");
    } else if (req.body.name) {
      sql.query(
        `UPDATE users SET name = '${req.body.name}' WHERE id = '${req.params.id}'`
      );
      res.status(200).send("update it's ok");
    } else if (req.body.picture_profil) {
      sql.query(
        `UPDATE users SET picture_profil = '${req.body.picture_profil}' WHERE id = '${req.params.id}'`
      );
      res.status(200).send("update it's ok");
    } else if (req.body.email) {
      sql.query(
        `UPDATE users  SET email='${req.body.email}' WHERE id = '${req.params.id}'`
      );

      let token = jwt.sign(
        { id: req.params.id, email: req.body.email },
        "x_TOKEN_SECRET",
        {
          expiresIn: 86400,
        }
      );
      res.status(200).json({ auth: true, token: token, id: req.params.id });
    } else {
      res.status(205).send("error");
    }
  } catch (err) {
    console.log(err);
  }
});


      

app.put("/products/:id", (req, res) => {
  try {
    if (req.body.name) {
      sql.query(
        `UPDATE products SET name = '${req.body.name}' WHERE id = '${req.params.id}'`
      );
      res.status(200).send("update it's ok");
    } else if (req.body.picture) {
      sql.query(
        `UPDATE products SET picture = '${req.body.picture}' WHERE id = '${req.params.id}'`
      );
      res.status(200).send("update it's ok");
    } else if (req.body.description) {
      sql.query(
        `UPDATE products SET description = '${req.body.description}' WHERE id = '${req.params.id}'`
      );
      res.status(200).send("update it's ok");
    } else if (req.body.category) {
      sql.query(
        `UPDATE products SET category = '${req.body.category}' WHERE id = '${req.params.id}'`
      );
      res.status(200).send("update it's ok");
    } else if (req.body.price) {
      sql.query(
        `UPDATE products SET price = '${req.body.price}' WHERE id = '${req.params.id}'`
      );
      res.status(200).send("update it's ok");
    } else {
      res.status(205).send("error");
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/users/:userID", (req, res) => {
  sql.query(`DELETE FROM users WHERE id ='${req.params.userID}'`, function (
    err,
    result
  ) {
    if (err) throw res.status(400).send("there is an error");
    console.log("Number of records deleted: " + result.affectedRows);
    res.status(200).send("This product is  deleted");
  });
});

app.delete("/products/:productsID", (req, res) => {
  sql.query(
    `DELETE FROM products WHERE id ='${req.params.productsID}'`,
    function (err, result) {
      if (err) {
        res.status(400).send("there is an error");
      }
      console.log("Number of records deleted: " + result.affectedRows);
      res.status(200).send("This product is  deleted");
    }
  );
});

module.exports = app;
