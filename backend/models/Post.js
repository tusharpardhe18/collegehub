import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["events", "noticeboard", "exchange", "requests"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    posterUrl: String,
    location: String,
    price: String,
    date: String, // store event date as a readable string (e.g., "Sat, 5 Jul")
    bookingLink: String,
    mode: String,
    instagram: String,
    
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
