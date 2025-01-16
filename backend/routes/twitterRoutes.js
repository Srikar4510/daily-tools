const express = require('express');
const { downloadTwitterVideo } = require('../controllers/twitterController');

const router = express.Router();

router.post('/download', downloadTwitterVideo);

module.exports = router;
