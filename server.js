const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./User");

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/userDB")
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("error connecting to DB",err));

app.get("/api/users", async(req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        })
    }catch(err){
        res.status(500).json({
            message: "Error fetching users",
            error: err
        })
    }
})
app.post("/api/users", async(req,res)=>{
    try{
        const user = new User(req.body);
        const result  = await user.save();
        res.status(201).json({
            message: "User created successfully",
            data: result
        })
    }catch(err){
        res.status(500).json({
            message: "Error creating user",
            error: err
        })
    }
})

app.listen(5000, () => console.log("Server started on port 5000"));
