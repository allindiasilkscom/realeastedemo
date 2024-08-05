import express from 'express';
import mongoose from 'mongoose';
import dotenv  from 'dotenv';

const app = express();
dotenv.config();

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB Connect")
}).catch((error)=>{
    console.log("DB"+error)
})


app.listen(3000,()=>{
    console.log(`server is running oin 3000`)
});
