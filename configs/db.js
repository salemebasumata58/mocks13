const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connect =async()=>{
  return mongoose.connect("mongodb+srv://salemes:salemes@cluster0.8hhyd86.mongodb.net/Mocks13?retryWrites=true&w=majority");
}

module.exports= connect;