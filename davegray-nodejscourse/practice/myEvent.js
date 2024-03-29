const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myemitter = new MyEmitter();

myemitter.on('writefile', () => console.log('File written'));

const writeFile = async () => {
    const message = 'This is some demo text I wrote';
    try {
        await fsPromise.appendFile(path.join(__dirname, 'demo.txt'), message);
        myemitter.emit('writefile');
    } catch (err) {
        console.error(err);
    }
}



writeFile();