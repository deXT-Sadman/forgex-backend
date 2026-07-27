const { Router } = require("express");
const { validate } = require("../middleware/validator");
const {
  signUp,
  login,
  forgetPassword,
} = require("../controllers/auth.controllers");
const {
  signupSchema,
  loginSchema,
  forgetPasswordSchema,
} = require("../validators/auth.validators");

const router = Router();

router.post("/signup", validate(signupSchema), signUp);
router.post("/login", validate(loginSchema), login);
router.post("/forget-password", validate(forgetPasswordSchema), forgetPassword);

module.exports = router;
