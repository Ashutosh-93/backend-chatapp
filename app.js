import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import connectDB from './configs/database.js';
const app = express();
dotenv.config();



const corsOption = {
    origins:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/message',messageRoutes);

const port = process.env.PORT ||  4000;

app.listen(port, ()=>{
connectDB();
console.log(`server running at port ${port} `);
})