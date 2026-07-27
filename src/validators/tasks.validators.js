const z = require("zod");

const getTaskByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid task ID format"),
  }),
});

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z
      .enum(["pending", "inProgress", "completed", "cancelled"])
      .optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.string().optional(),
  }),
});

const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid task ID format"),
  }),
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    status: z
      .enum(["pending", "inProgress", "completed", "cancelled"])
      .optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.string().optional(),
  }),
});

const deleteTaskSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid task ID format"),
  }),
});

module.exports = {
  getTaskByIdSchema,
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
};
