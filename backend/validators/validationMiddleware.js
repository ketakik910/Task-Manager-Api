const { body } = require("express-validator");

const createTaskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];
module.exports = {
    createTaskValidation,
}
