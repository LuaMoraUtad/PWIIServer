const express = require("express");
const { getMerchants, getMerchantsById, registerMerchants } = require("../controllers/merchants")
const { validatorGetMerchants, validatorRegisterMerchants } = require("../validators/merchants");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();

router.get("/", authMiddleware, checkRol(["admin"]), getMerchants);

router.get("/:id", authMiddleware, checkRol(["admin"]),validatorGetMerchants, getMerchantsById);

router.post("/", authMiddleware, checkRol(["admin"]), validatorRegisterMerchants, registerMerchants);

/*

router.post("/login", validatorLogin, loginCtrl);

router.put("/setadmin", authMiddleware, validatorSetadmin, setadminCtrl);

router.put("/update/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, validatorUpdate, updateUser);

router.delete("/users/:id", authMiddleware, validatorGetUser, deleteUser);*/

module.exports = router;
