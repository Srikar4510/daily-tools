const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const twitterRoutes = require('./routes/twitterRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Backend API routes
app.use('/api/twitter', twitterRoutes);

// Serve React app for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
