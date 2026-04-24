import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    mood: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    response: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Journal", journalSchema);