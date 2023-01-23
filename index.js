const express = require("express");
const cors = require("cors");

const connect = require("./configs/db");

let app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> {
    return res.send("Hello Its me Salem");
})

app.listen(8081, async()=>{
    await connect();
    console.log(`listening to 8081`);
})
    
