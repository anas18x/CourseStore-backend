import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({

    title: { type: String, required: true },

    imageUrl: { type: String, required: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("course", courseSchema);
