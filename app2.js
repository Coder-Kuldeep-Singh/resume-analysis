const http = require('http');
const formidable = require('formidable');
var fs = require('fs')
// const path = require('path');
const dotenv = require('dotenv'); // load env file reader module


dotenv.config(); // loading env file
const GlobalVariables = {
    "port": process.env.PORT,
    'directPath': __dirname + '/' + process.env.TEMPLATES_FOLDER + '/',
    "resumePath": __dirname + '/' + process.env.UPLOADS + '/',
}





http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = './uploads/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(GlobalVariables['port']);