// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
  console.log(`Controller for the register !`);

  try {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashPassword, role });
    await newUser.save();
    res
      .status(201)
      .json({
        message: `User register successfully with username: ${username}`,
      });
  } catch (error) {
    console.log(`Erorr while registering the new user`);

    res
      .status(500)
      .json({ message: `Something went wrong while creating the user` });
  }
};

export const login = async (req, res)  => {
    try {
        console.log(`Controller for the Login !`);
        
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user) {
                return res.status(404).json({message: `User with username not found`})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message: `Invalid credential`})
        }


        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );


    res.status(200).json({ token})

    } catch (error) {
        console.log('err---',error)
         res
      .status(500)
      .json({ message: `Something went wrong while creating the user` });
  }
    
}


// module.exports = {
//     register, login
// }