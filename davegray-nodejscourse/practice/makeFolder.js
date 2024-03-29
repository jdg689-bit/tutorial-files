// If a folder for results doesn't exits, create one
const fs = require('fs');
const path = require('path');

const makeDir = async () => {
    try {
        await fs.promises.mkdir(path.join(__dirname, 'results'));
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }   
};

makeDir();
