const express = require("express");
const { getMerchants, getMerchantsById, registerMerchants, updateMerchants, deleteMerchants } = require("../controllers/merchants")
const { validatorGetMerchants, validatorRegisterMerchants, validatorUpdateMerchants } = require("../validators/merchants");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();

router.get("/", authMiddleware, checkRol(["admin"]), validatorGetMerchants, getMerchants);

router.get("/:id", authMiddleware, checkRol(["admin"]), validatorGetMerchants, getMerchantsById);

router.post("/", authMiddleware, checkRol(["admin"]), validatorRegisterMerchants, registerMerchants);

router.put("/:id", authMiddleware, checkRol(["admin"]), validatorGetMerchants, validatorUpdateMerchants, updateMerchants);

router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorGetMerchants, deleteMerchants);

module.exports = router;
