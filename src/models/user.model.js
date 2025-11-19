import mongoose from "mongoose";
const {Schema} = mongoose

const userSchema = new Schema({

   userName : {type: String, required: true},

   email : {type: String, required: true, unique: true},

   password: {type: String, required: true},

   role: {
    type: String,
    enum: ["user", "admin",],
    default: "user"
   },

},{timestamps: true})

export const User = mongoose.model("user",userSchema)

