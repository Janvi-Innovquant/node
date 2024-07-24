let express = require("express");
let route = express.Router();
let Users = require("../controllers/usercnt")
let Connections = require("../controllers/connectioncnt");
const pagination = require("../middleware/pagination");
let User = require("../models/usermodel")

//User
/**
 * @swagger
 * /api/saveuser:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
route.post("/saveuser",Users.saveuser)

//Connection
/**
 * @swagger
 * /api/saveconn:
 *   post:
 *     summary: Create a new Connection
 *     tags: [Connection]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestedBy
 *               - requestedTo
 *               - amount
 *               - status
 *             properties:
 *               requestedBy:
 *                 type: string
 *               requestedTo:
 *                 type: string
 *               amount:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Connection created
 */
route.post("/saveconn",Connections.saveconnection)

/**
 * @swagger
 * /api/getConnection:
 *   get:
 *     summary: Get All Connection
 *     tags: [Connection]
 *     parameters:
 *           - in: query
 *              name: page
 *              schema:
 *                  type:string
 *              required:true
 *              description: Page query
 *     responses:
 *       201:
 *         description: Get Connection 
 */
route.get("/getConnection", Connections.getConnection)

module.exports = route