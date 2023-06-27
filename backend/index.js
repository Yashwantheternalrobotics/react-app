const express= require ('express')
const connectDB= require('./Config/db');
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')
connectDB();

const app= express()
app.use(bodyParser.json());
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/users', require('./Routes/userRoute'));
app.use('/api/home', require('./Routes/homeRoute'));
app.use('/api/alerts',require('./Routes/alertsRoute'));
app.use('/api/analytics',require('./Routes/analyticsRoute'));


app.get("/",(req,res) => {
    res.json("users server is running succesfully");
})
if(process.env.ENVIRONMENT == "lambda"){
         module.exports.handler = serverless(app)
}
else{
app.listen(process.env.PORT,()=>{
    console.log("running on port 5000....")
})
}