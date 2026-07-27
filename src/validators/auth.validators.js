const z = require("zod");

const signupSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

const forgetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
  }),
});

module.exports = {
  signupSchema,
  loginSchema,
  forgetPasswordSchema,
};
