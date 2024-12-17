// const mongoose = require('mongoose');
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,

    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager", "user"]
    }
}, 
{timestamps: true})



const User = mongoose.model("User", userSchema);

export default User;