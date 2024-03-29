
import express from "express";

import dotenv from "dotenv";
dotenv.config();

import login from './routes/login.js';
import forgetpassword  from './routes/forget.js' ;
import resetToken from './routes/reset.js'
import signup from './routes/signup.js';
import mongoose from "mongoose" ;
import userPost from './routes/post-route.js';
//connect database
mongoose.set('strictQuery', false);
try{ 
  const uri = process.env.MONGO_DB;
  mongoose.connect(uri, { useNewUrlParser: true });
}catch(e){
  console.log('No connectionrs');
}
const app = express();
app.set('view engine', 'ejs');


app.use(express.json())
app.use(express.urlencoded({extended: false}))


//routes
app.use('/api/v1/',login);
app.use('/api/v1/',signup);
app.use('/api/v1/',forgetpassword);
app.use('/',resetToken);
app.use('/api/v1/',userPost);

app.get('/', (req,res)=>{
  res.send("hello");
});

//listen
app.listen(process.env.PORT, function () {
  console.log("Server started on port",process.env.PORT);
});
