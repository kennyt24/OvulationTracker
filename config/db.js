const mongoose = require('mongoose')

const db = async()=>{
     mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGODB_URI,()=>{
        console.log("connected to db");

    });
};

module.exports = db;