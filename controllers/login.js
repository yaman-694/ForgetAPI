
//importing modules
import dotenv from 'dotenv';
import User from '../models/User.js'
import md5 from 'md5';
dotenv.config();

//JWT function
import createToken from '../middleware/createToken.js';



const Postlogin = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        // console.log(name,email,password,confirm_password);
        
        //find user
        const user = User.find({email:email}).then((user) => {
            // console.log("user",);
            if(user.length==0){
                res.json({ status: "error", message: "User not found", data: null });
            }
            else{
                const hashed = md5(password);
                // console.log(user);
                if(user[0].password==hashed){
                    console.log("user",user[0]._id);
                    const token = createToken(user[0]._id);
                    const maxAge = 3*24*60*60;
                    res.cookie('auth', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.json({ status: "success", message: "User loggedin successfully!", data: { user: user, token: token } });
                }
                else{
                    res.json({ status: "error", message: "Password doesn't match", data: null });
                }
            }

        }).catch((err) => {
            res.json({ status: "error", message: err.message, data: null });
        });

    } catch (err) {
        res.json({ status: "error", message: err.message, data: null });
    }
}

export default Postlogin;