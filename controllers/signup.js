
//importing modules
import dotenv from 'dotenv';
// import uuid from 'uuid-random';?
import User from '../models/User.js'
import md5 from 'md5';
dotenv.config();

//JWT function
import createToken from '../middleware/createToken.js';



const Postregister = async (req, res) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        // console.log(name,email,password,confirm_password);
        if (name == "" || email == "" || password == "") {
            res.status(400).json({ "msg": "Please fill all the fields" });
        }
        else if (confirm_password != password) {
            res.status(400).json({ "msg": "confirm password doesn't match" });
        }
        else {
                const hashed = md5(password);
                const maxAge = 3*24*60*60;
                new User({
                    name,
                    email,
                    password: hashed
                }).save().then((user) => {
                    const token = createToken(user._id);
                    res.cookie('auth', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.json({ status: "success", message: "User registered successfully!", data: { user: user, token: token } });
                }).catch((err) => {
                    res.json({ status: "error", message: err.message, data: null });
                });
            }
        
    } catch (err) {
        res.json({ status: "error", message: err.message, data: null });
    }
}

export default Postregister;