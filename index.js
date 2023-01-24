const express = require("express");
const cors = require("cors");

const connect = require("./configs/db");
const userRouter=require("./routes/user.route")
const jobsRouter = require("./routes/jobs.route")
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/users", userRouter)
app.use("/jobs", jobsRouter)

app.get("/", (req, res)=> {
    return res.send("Hello Its me Salem");
})

app.listen(8081, async()=>{
    await connect();
    console.log(`listening to 8081`);
})
    


//knqVNVkiJphMK0T6H1UINnU19GX3ssX1