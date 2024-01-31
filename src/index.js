const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const path = require("path");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NodeJs MongoDB API",
            version: "1.0.0"
        },
        servers:[
            {
            url: "http://localhost:9000"
            },
        ],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//settings
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use('/api', userRoute);
app.use(
    "/api-doc", 
    swaggerUI.serve, 
    swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);


//routes
app.get("/", (req, res) =>{
    res.send("Welcome to my API");
});

// mongodb connect
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MONGODB Atlas'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('server listenign on port', port));
 