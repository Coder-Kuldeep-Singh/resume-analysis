const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


const port = 3000;



router.get("/resume-analysis", (req, resp) => {
    const directPath = __dirname + "/views/"
    resp.sendFile(path.join(directPath + 'index.html'));
    // _dirname: It will resolve to your project folder
});


router.get("/ping", (req, resp) => {
    resp.end("ping");
});


// add the router
app.use("/", router);
app.listen(port)
console.log(`Server running at http://127.0.0.1:${port}/`);