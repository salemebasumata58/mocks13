const express = require("express");
const User = require("../models/user.model");
const argon2 = require("argon2");
const app = express.Router();
const jwt = require("jsonwebtoken");
app.post("/signup", async (req, res) => {
  let { email, password, username } = req.body;
  let [a, b] = email.split("@");
  console.log(b);

  console.log(email, password);
  let hash = await argon2.hash(password);
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(404).send(`cannot create a user with existing email id`);
    } else {
        let user 
        if(b == "masaischool.com"){
          user  = await User.create({
                username,
                email,
                password: hash,
                role: "admin"
              })
        }else{
       user = await User.create({
        username,
        email,
        password: hash,
      });
    }
    return  res.send({user, message: "SignUp Success" });
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    let user = await User.findOne({ email }); // User is from model;
    console.log(user);
    if (user) {
      if (await argon2.verify(user.password, password)) {
        let token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            password: user.password,
            role: user.role,
          },
          "MYSECRET12345",
          { expiresIn: "2 days" }
        );
        return res.send({
          token: token,
          role: user.role,
          message: "Login Successfull",
        });
      } else {
        res.status(401).send(`Authentication failed, incorrect password`);
      }
    } else {
      res.status(401).send(`User with email: ${email} not found`);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});
module.exports = app;
