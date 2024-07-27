let express = require("express");
let route = express.Router();
let Users = require("../controllers/usercnt")
let Connections = require("../controllers/connectioncnt");
const pagination = require("../middleware/pagination");
let User = require("../models/usermodel")
const multer = require("multer")
const path = require("path")

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
 *     responses:
 *       200:
 *         description: Get Connection 
 */
route.get("/getConnection", Connections.getConnection)

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
})

  const upload = multer({ storage: storage });

 
/**
 * @swagger
 * /api/match:
 *   post:
 *     summary: Upload a file
 *     tags: [User]
 *     requestBody:
 *        required: true
 *     content:
 *        multipart/form-data:
 *          schema:
 *             type: object
 *             properties:
 *                file:
 *                  type: string
 *                  format: binary
 *                  description: The Excel file to upload. 
 *     parameters:
 *          - in: formData
 *            name: upload file
 *            type: file
 *     description: The file to upload
 *     required: true
 *     responses:
 *       201:
 *         description: Matched Data
 */
route.post('/match', upload.single('file'), Users.matchdata)

module.exports = route