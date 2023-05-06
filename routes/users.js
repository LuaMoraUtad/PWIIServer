const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const { createUser, getUsersCity, updateUser, deleteUser } = require("../controllers/users");
const { validatorCreateUser, validatorGetCity, validatorGetUser, validatorUpdateUser } = require("../validators/users");
const customHeader = require("../middleware/customHeader");

/**
 * @openapi
 * /api/users/{ciudad}:
 *  get:
 *      tags:
 *      - Users
 *      summary: Get of users in the System
 *      description: Get users from database
 *      parameters:
 *          -   name: ciudad
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.get("/:ciudad", authMiddleware, checkRol(["merchant"]), validatorGetCity, getUsersCity);

/**
 * @openapi
 * /api/users:
 *  post:
 *      tags:
 *      - Users
 *      summary: Post of users in the System
 *      description: Register of a user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/users"
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
*/
router.post("/", validatorCreateUser, customHeader, createUser);

/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags:
 *      - Users
 *      summary: Post of users in the System
 *      description: Update of a user
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
 *                      $ref: "#/components/schemas/users"
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
*/
router.put("/:id", validatorGetUser, validatorUpdateUser, updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *      tags:
 *      - Users
 *      summary: Delete of users in the System
 *      description: Delete users by ID from database
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
*/
router.delete("/:id", validatorGetUser, deleteUser);

module.exports = router;
