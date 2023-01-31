
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer";
import config from '../config/keys.js';
import User from '../models/User.js';
import createtoken from '../middleware/createToken.js';

const nodemailfunc = async (email, link) => {
console.log(config.nodemailDetails);
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.nodemailDetails.email, // 
    pass: config.nodemailDetails.password //
  },
});
await transporter.sendMail({
  from: config.nodemailDetails.email, // sender address
  to: email, // list of receivers
  subject: "Reset Link", // Subject line
  html: `<b>Rest Link ${link}</b>`, // html body
}, (err, info) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log(info.response);
  }
});

}


const Postforget = async (req, res) => {
  const email = req.body.email;
  if (!(email)) {
    res.status(400).json({ "err": "Enter email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.send('User not exist');
    return;
  }
  const token = createtoken(user._id, user.password, user.email);
  const link = 'https://task1-kvhj.onrender.com' + '/reset-token/' + user.id + '/' + token;
  console.log(link)
  nodemailfunc(email, link);
  

  res.send("Sent to the Email");


}

export default Postforget;