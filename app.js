const http = require('http');

const express = require('express');

const app = express();
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv'); // load env file reader module
const fs = require('fs');


dotenv.config(); // loading env file
const GlobalVariables = {
    "port": process.env.PORT,
    'directPath': __dirname + '/' + process.env.TEMPLATES_FOLDER + '/',
    "resumePath": __dirname + '/' + process.env.UPLOADS + '/',
}



router.get("/resume-analysis", (req, resp) => {
    fs.readFile(GlobalVariables['resumePath'] + "resume.pdf", (err, data) => {
        console.log(data.toString());
    });
    resp.sendFile(path.join(GlobalVariables['directPath'] + 'index.html'));
    // _dirname: It will resolve to your project folder
});

// router.post('/resume-analysis', async (req, resp) => {
//     try {
//         if (!req.files) {
//             resp.send({
//                 status: false,
//                 message: 'No file uploaded',
//             });
//         } else {
//             let avatar = req.files.avatar;

//             // Use the mv() method to place the file in uploads folder
//             avatar.mv
//         }
//     } catch {

//     }
// });


router.get("/ping", (req, resp) => {
    resp.end("ping");
});


// add the router
app.use("/", router);
app.listen(GlobalVariables['port']);
console.log(`Server running at http://127.0.0.1:${GlobalVariables['port']}/`);