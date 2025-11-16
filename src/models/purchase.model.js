import mongoose from "mongoose";
const {Schema} = mongoose


const purchaseSchema = new Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},

    courseId : {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},

},{timestamps: true})

export const Purchase = mongoose.model("purchase",purchaseSchema)