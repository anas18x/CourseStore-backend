import mongoose from "mongoose";
const {Schema} = mongoose

const wishListSchema = new Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},

    courseId : {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
}, {timestamps: true})



export const Cart = mongoose.model("cart", wishListSchema)


