import Task from "../model/todo.js";
import { User } from "../model/user.js";

export const newTask = async (req, res) => {
  const { title, description } = req.body;

  const taskCreate = await Task.create({ title, description, user: req.user });

  res.json({
    success: true,
    message: "Task added successfully !!",
    taskCreate,
  });
};

export const getMyTask = async (req, res) => {
  const userid = req.user._id;
  const task = await Task.find({ user: userid });

  if (task) {
    return res.json({ success: true, task });
  }
  return res.json({ message: "User not found" });
};

export const updateMyTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.isCompleted = !task.isCompleted;
  await task.save();
  res.json({ success: true, message: "Task updated successfull." });
};

export const deleteMyTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  await task.deleteOne();

  res.json({ success: true, message: "Task Deleted successfully !!!" });
};
