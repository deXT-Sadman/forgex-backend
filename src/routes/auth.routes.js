const { Router } = require("express");
const { signUp } = require("../controllers/auth.controllers");
const { validate } = require("../middleware/validator");
const { signupSchema } = require("../validators/auth.validators");

const router = Router();

router.post("/signup", validate(signupSchema), signUp);

module.exports = router;
