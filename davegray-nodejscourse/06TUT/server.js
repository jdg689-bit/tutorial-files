const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 1080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
