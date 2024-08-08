import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userModelRoutes.js';
import authRouter from './routes/authRouter.js'
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.log("DB Error: " + error);
    });

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use((err,req,res,next)=>{
    const statuscode =  err.statuscode || 500
    const message =  err.message || "internal Server issue"
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
