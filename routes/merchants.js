const express = require("express");
const { getMerchants, getMerchantsById, registerMerchants, updateMerchants, deleteMerchants } = require("../controllers/merchants")
const { validatorGetMerchants, validatorRegisterMerchants, validatorUpdateMerchants } = require("../validators/merchants");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const router = express.Router();

/**
 * @openapi
 * /api/merchants:
 *  get:
 *      tags:
 *      - Merchants
 *      summary: Get of merchants in the System
 *      description: Get merchants from database
 *      responses:
 *          '200':
 *              description: Returns the merchants
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.get("/", authMiddleware, checkRol(["admin"]), getMerchants);

/**
 * @openapi
 * /api/merchants/{id}:
 *  get:
 *      tags:
 *      - Merchants
 *      summary: Get of merchants in the System
 *      description: Get merchants by ID from database
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the merchants
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.get("/:id", authMiddleware, checkRol(["admin"]), validatorGetMerchants, getMerchantsById);

/**
 * @openapi
 * /api/merchants:
 *  post:
 *      tags:
 *      - Merchants
 *      summary: Post of merchants in the System
 *      description: Register of a merchant
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchants"
 *      responses:
 *          '200':
 *              description: Returns the merchants
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.post("/", authMiddleware, checkRol(["admin"]), validatorRegisterMerchants, registerMerchants);

/**
 * @openapi
 * /api/merchants/{id}:
 *  put:
 *      tags:
 *      - Merchants
 *      summary: Put of merchants in the System
 *      description: Update a merchant
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchants"
 *      responses:
 *          '200':
 *              description: Returns the merchants
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.put("/:id", authMiddleware, checkRol(["admin"]), validatorGetMerchants, validatorUpdateMerchants, updateMerchants);

/**
 * @openapi
 * /api/merchants/{id}:
 *  delete:
 *      tags:
 *      - Merchants
 *      summary: Delete of merchants in the System
 *      description: Delete merchants by ID from database
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the merchants
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorGetMerchants, deleteMerchants);

module.exports = router;
