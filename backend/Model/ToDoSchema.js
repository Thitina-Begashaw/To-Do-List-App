import mongoose, { model } from "mongoose";

const ToDoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamp: true }
);
const ToDo = mongoose.model("ToDo", ToDoSchema);
export default ToDo;
