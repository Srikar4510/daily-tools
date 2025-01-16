const axios = require('axios');
const { extractVideoUrl } = require('../utils/downloader');

const downloadTwitterVideo = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const videoUrl = await extractVideoUrl(url);
        res.status(200).json({ videoUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video. Please try again.' });
    }
};

module.exports = { downloadTwitterVideo };
