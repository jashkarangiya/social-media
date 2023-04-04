import mongoose from "mongoose";
import express from "express";

const MONGO_URL = "mongodb://0.0.0.0:27017/ConnectMore"


const connections = async(req, res) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URL)
        .then(console.log(`DB Connection is success!`))
        .catch((error) => {
            console.log(`DB connection is Failed!`)
            console.log(error);
        })
}

// module.exports = connections;