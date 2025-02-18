const Todo = require("../models/Todo");
const logger = require("../utils/logger");

exports.getAllTodosbyAccountId = async (req, res) => {
  const accountId = req.query.accountId;
  try {
    const todos = await Todo.find({ accountId });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addTodo = async (req, res) => {
  const { title, accountId } = req.body;
  try {
    const newTodo = new Todo({ title, accountId });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
