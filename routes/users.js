const express = require("express");
const router = express.Router();

/*router.get("/", (req, res) => {
    const data = ["users"]
    res.send({data});
});*/

const { getItems, getItem, createItem } = require("../controllers/users");
const { validatorCreateItem } = require("../validators/users");
const customHeader = require("../middleware/customHeader");

router.get("/", getItems);
router.get("/:id", getItem);

router.post("/", createItem);
router.post("/", validatorCreateItem, createItem);
router.post("/", validatorCreateItem, customHeader, createItem);

module.exports = router;
