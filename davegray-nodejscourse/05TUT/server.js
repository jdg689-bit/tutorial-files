const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
// initialise object
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 1080;

// This function is used to serve files and the 404 response
const serveFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8' : ''
            );
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            { 'Content-Type': contentType }
            );
        response.end(data);
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const fileExtension = path.extname(req.url);

    let contentType;

    switch (fileExtension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        default:
            contentType = 'text/html';
    }

    // This is dependent on how you've structure your folders
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'pages', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'pages', req.url, 'index.html') // This accounts for index being in a subdir and not the main directory (not needed here, I haven't made a subdir)
                : contentType === 'text/html'
                    ? path.join(__dirname, 'pages', req.url)
                    : path.join(__dirname, req.url) // This covers files that aren't text/html


    // Check to see that file exists
    const fileExists = fs.existsSync(filePath); // True or False value

    if (fileExists) {
        // serve the file
        serveFile(filePath, contentType, res);
    } else {
        switch(path.parse(filePath).base) {
            case 'old-page.html': // This is a specific example for the tutorial
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            default:
                // serve a 404 response
                serveFile(path.join(__dirname, 'pages', '404.html'), 'text/html', res);
        }
    }



    /*
    let filePath;

    if (req.url === '/' || req.url === 'index.html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'pages', 'index.html');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                // Catch error inside of asynchronous call
                console.error(err);
                res.statusCode = 500; // Internal Server Error
                res.end('Error loading index.html');
            }
            res.end(data);
        })
    }
    */
});

// Listen should always be at the end of server.js file
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
