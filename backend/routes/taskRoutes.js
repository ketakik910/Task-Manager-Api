const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,  
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {authMiddleware} = require("../middleware/authMiddleware");
const {createTaskValidation} = require("../validators/validationMiddleware");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware); 

router.post("/",createTaskValidation,createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id",createTaskValidation,updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
