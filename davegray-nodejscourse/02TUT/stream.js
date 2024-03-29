// For large text it can be better to move it piece by piece, rather than all at once
const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf8'});

const ws = fs.createWriteStream('./files/write-lorem.txt');

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// });

// Alternatively
rs.pipe(ws);