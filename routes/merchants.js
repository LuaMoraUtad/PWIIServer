const express = require("express");
const {getMerchants} = require("../controllers/merchants")
const {validatorRegister, validatorLogin, validatorSetadmin, validatorGetUser, validatorUpdate} = require("../validators/auth");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();



router.get("/merchants", authMiddleware, checkRol(["admin"]), getMerchants);

/*router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);

router.put("/setadmin", authMiddleware, validatorSetadmin, setadminCtrl);

router.put("/update/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, validatorUpdate, updateUser);

router.delete("/users/:id", authMiddleware, validatorGetUser, deleteUser);*/

module.exports = router;
