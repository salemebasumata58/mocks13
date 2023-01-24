const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
   company: {type:String, required: true, unique:true},
    position: {type: String, required:true, },
    contract:{type: String,
        enum :["Full Time", "Part Time"],
        required: true},
    location: {
        type: String
    }
   
},{
    versionKey: false,
    timestamps:true
});
const Jobs = mongoose.model("jobs", jobsSchema);

module.exports = Jobs;
