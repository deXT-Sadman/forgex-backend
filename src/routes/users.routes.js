const { Router } = require("express");
const { authenticate } = require("../middleware/auth");
const { validate } = require("../middleware/validator");
const { getMe, updateMe } = require("../controllers/users.controllers");
const { updateUserSchema } = require("../validators/users.validators");

const router = Router();

router.use(authenticate);

router.route("/me").get(getMe).patch(validate(updateUserSchema), updateMe);

module.exports = router;
