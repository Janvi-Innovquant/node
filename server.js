let express = require("express");
let app = express();
const PORT = 1001 
let cors = require("cors");
let bodyparser = require("body-parser");
let Route = require("./routes/route")
let ConnectDB = require("./DB")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require("./doc/swagger");

ConnectDB();

// Swagger setup

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
app.use('/api',Route);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})