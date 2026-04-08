//just http req,res handling
const { 
  createTaskService,
  getTasksService,
  getTasksByIdService,
  updateTaskService,
  deleteTaskService,
} = require("../service/taskService");

const asyncHandler = require("../utils/asyncHandler")

// Create a new task
const createTask = asyncHandler(async (req, res) => {
  try {
    const result = await createTaskService(req.user.id, req.body);
    return res
      .status(201)
      .json({ task: result, message: "Task created successfully" });
  } catch (error) {
    next(error);
  }
});

// Get all tasks
const getTasks = asyncHandler(async (req, res) => {
  try {
    const result = await getTasksService(req.user.id, req.query);

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks: result.tasks,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });

  } catch (error) {
    next(error);
  }
});

// Get a task by ID
const getTaskById = asyncHandler(async (req, res) =>  {
  try {
    const result = await getTasksByIdService(req.user.id, req.params.id);
    return res
      .status(200)
      .json({ task: result, message: "Task retrieved successfully" });
  } catch (error) {
    next(error);
  }
});

// Update a task
const updateTask = asyncHandler(async (req, res) => {
  try {
    const result = await  updateTaskService(req.user.id, req.params.id, req.body);
    return res
      .status(200)
      .json({ task: result, message: "Task updated successfully" });
  } catch (error) {
    next(error);
  }
});

// Delete a task
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const result = await deleteTaskService(req.user.id, req.params.id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};