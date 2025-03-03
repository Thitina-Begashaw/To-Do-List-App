import ToDo from "../Model/ToDoSchema.js";
import mongoose from "mongoose";
const createToDoList = async(req,res)=>{
const {Title , Description} = req.body;
try{
const ToDoList = await ToDo.create({Title, Description})
res.status(200).json(ToDoList)
}catch(error){
    console.log(error);
    res.status(404).json({
        message: "Failed to Create To do List",
    })
}}

const updateToDoList = async(req,res)=>{
    const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No To Do List with that id" });
      }
    
      try {
        const ToDoList = await ToDo.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );
    
        if (!ToDoList) {
          return res.status(404).json({ message: "No To Do List with that id" });
        }
        res.status(200).json(ToDoList);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating the To Do List" });
      }
    };

    const getToDoList = async (req, res) => {
        try {
          const ToDoList= await ToDo.find().sort({ createdAt: -1 });
          res.status(200).json(ToDoList);
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: "Failed to retrieve menu items. Please try again later.",
          });
        }
      };


    const deleteToDoList = async (req, res) => {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
          return res.status(404).json("No To Do List with that id");
      
        try {
          const ToDoList = await ToDo.findByIdAndDelete({ _id: id });
          res.status(200).json(ToDoList);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Failed to delete the To Do List." });
        }
      };
      

export {createToDoList , updateToDoList , getToDoList , deleteToDoList};