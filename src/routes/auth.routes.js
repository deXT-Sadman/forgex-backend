const { Router } = require("express");
const { validate } = require("../middleware/validator");
const { signUp, login } = require("../controllers/auth.controllers");
const { signupSchema, loginSchema } = require("../validators/auth.validators");

const router = Router();

router.post("/signup", validate(signupSchema), signUp);
router.post("/login", validate(loginSchema), login);

module.exports = router;
