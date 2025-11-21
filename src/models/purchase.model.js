import mongoose from "mongoose";
const {Schema} = mongoose


const purchaseSchema = new Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},

    courseId : {type: mongoose.Schema.Types.ObjectId, ref: "course", required: true},

},{timestamps: true})

export const Purchase = mongoose.model("purchase",purchaseSchema)
