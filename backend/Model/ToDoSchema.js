import mongoose, {model} from "mongoose";
import express from "express"

const ToDoSchema = new mongoose.Schema ({
  Title:{
     type:String,
     required: true,
  },
  Description:{
    type:String,
    required:true,
  }}, {timestamp:true}
)
const ToDo = mongoose.model("ToDo" , ToDoSchema)
export default ToDo;