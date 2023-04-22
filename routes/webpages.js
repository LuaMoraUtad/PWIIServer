const express = require("express");
const { registerPaginaCompleta, updatePagina, registerFotoPagina, registerTextoPagina, deletePagina } = require("../controllers/webpages")
const { validatorGetPagina, validatorRegisterPagina, validatorUpdatePagina, validatorGuardarFotoPagina, validatorGuardarTextoPagina } = require("../validators/webpages");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();

router.post("/", authMiddleware, checkRol(["merchant"]), validatorRegisterPagina, registerPaginaCompleta);

router.put("/:id", authMiddleware, checkRol(["merchant"]), validatorGetPagina, validatorUpdatePagina, updatePagina);

router.post("/photos", authMiddleware, checkRol(["merchant"]), validatorGuardarFotoPagina, registerFotoPagina);

router.post("/texts", authMiddleware, checkRol(["merchant"]), validatorGuardarTextoPagina, registerTextoPagina);

router.delete("/:id", authMiddleware, checkRol(["merchant"]), validatorGetPagina, deletePagina);

module.exports = router;
