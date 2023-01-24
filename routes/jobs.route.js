const express = require("express");
const Jobs = require("../models/jobs.model");
const argon2 = require("argon2");

const jwt = require("jsonwebtoken");
const authMidelwares =async (req, res, next)=>{
    let token = req.headers.authorization;
    console.log(token);
    if(!token){
        return res.status(401).send("unauthorized");
    }
    try{
        const verification = jwt.verify(token, "MYSECRET12345");
        const { role } = jwt.decode(token);

        console.log(role)
        if(verification){
            if(role == "admin"){
           
         (req.userId= verification.id), next();
            }
            else {
                return res.status(401).send("You are not authorized");
            }
           // return
        }
       }catch(e){
           return res.status(402).send(e.message);
       }
}
const app = express.Router();
app.get("/", async(req,res)=>{
  try{
    let jobs = await Jobs.find();
    return res.send(jobs)

  }catch(e){
    res.status(404).send(e.message);
  }
})
app.use(authMidelwares)
app.post("/create", async (req, res) => {
    const { company, position, contract, location } = req.body;
  console.log(company, position, contract, location);

  try {
     let jobs = await Jobs.create({
        company, position, contract, location
     })
    
    return  res.send({jobs, message: "Success" });
    }
  catch (e) {
    res.status(404).send(e.message);
  }
});
app.patch("/:id", async (req, res) => {
    const { id } = req.params;
    
  console.log(id);

  try {
     let jobs = await Jobs.findByIdAndUpdate(
        id,
        {...req.body},
       { new: true}
     )
    
    return  res.send({jobs, message: "Success" });
    }
  catch (e) {
    res.status(404).send(e.message);
  }
});
app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    
  console.log(id);

  try {
     let jobs = await Jobs.findByIdAndDelete(
        id
     )
    
    return  res.send({jobs, message: "Delete Successfully" });
    }
  catch (e) {
    res.status(404).send(e.message);
  }
});


module.exports = app;
