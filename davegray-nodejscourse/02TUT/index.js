const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        // existsSync checks if file already exists
        if (!fs.existsSync('./files/promiseComplete.txt')) {
            await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
            console.log('Write file created.')
            await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you.');
            await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        }
    } catch (err) {
        console.error(err)
    }
}

fileOps();

/*
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => { // specify encoding with utf8, otherwise you log buffer data
    if (err) throw err;
    console.log(data);
});
*/

// Demonstration of asynch, this will log while the file reads
console.log('Waiting...')

/*
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.', (err) => { 
    if (err) throw err;
    console.log('Write complete');
});
*/

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
});