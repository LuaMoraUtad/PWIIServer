const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

const { getItems, getItem, createItem, getUsersCity } = require("../controllers/users");
const { validatorCreateItem, validatorGetCity } = require("../validators/users");
const customHeader = require("../middleware/customHeader");

router.get("/", getItems);
//router.get("/:id", getItem);

router.post("/", createItem);
router.post("/", validatorCreateItem, createItem);
router.post("/", validatorCreateItem, customHeader, createItem);

router.get("/:ciudad", authMiddleware, checkRol(["merchant"]), validatorGetCity, getUsersCity);

module.exports = router;
