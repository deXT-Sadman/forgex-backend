const { Router } = require("express");
const { authenticate } = require("../middleware/auth");
const { validate } = require("../middleware/validator");
const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers");
const {
  createTaskSchema,
  getTaskByIdSchema,
  updateTaskSchema,
  deleteTaskSchema,
} = require("../validators/tasks.validators");

const router = Router();

router.use(authenticate);

router.route("/").get(getAllTasks).post(validate(createTaskSchema), createTask);

router
  .route("/:id")
  .get(validate(getTaskByIdSchema), getTaskById)
  .put(validate(updateTaskSchema), updateTask)
  .delete(validate(deleteTaskSchema), deleteTask);

module.exports = router;
