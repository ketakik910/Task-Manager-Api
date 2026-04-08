const Task = require("../models/taskModel");
//bussiness logic for tasks

async function createTaskService(userId, taskData) {
  const { title, description } = taskData;
    if (!title || !description) {
      throw new Error("Title and description are required");
    }
    const newTask = await Task.create({
      title,
      description,
      user: userId,
    });
    const createdTask = {
      id: newTask._id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
    };
    return createdTask;
}

async function getTasksService(userId, queryParams) {
  const { status, search, page = 1, limit = 5 } = queryParams;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  if (pageNum < 1 || limitNum < 1) {
    throw new Error("Invalid pagination values");
  }

  let query = { user: userId };

  if (status) query.status = status;

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const total = await Task.countDocuments(query);

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  const tasksData = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
  }));

  return {
    tasks: tasksData,
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  };
}

async function getTasksByIdService(userId, taskId) {
  // Fetch a specific task by ID
    //for security reasons, we also check if the task belongs to the authenticated user
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new Error("Task not found");
    }
    const createdTask = {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
    };
    return createdTask;
}

async function updateTaskService(userId, taskId, taskData) {
  const { title, description } = taskData;
      if (!title || !description) {
        throw new Error("Title and description are required");
      }
      const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId }, // query
        { title, description }, // update
        { new: true }, // return the updated document
      );
      if (!task) {
        throw new Error("Task not found");
      }
      const createdTask = {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
      };
      return createdTask;
}

async function deleteTaskService(userId, taskId) {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    throw new Error("Task not found");
  }
  return { message: "Task deleted successfully" };
}

module.exports = {
  createTaskService,
  getTasksService,
  getTasksByIdService,
  updateTaskService,
  deleteTaskService,
};