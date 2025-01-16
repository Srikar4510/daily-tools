const axios = require('axios');

// Function to extract the tweet ID from a given URL
const extractTweetId = (url) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
};

// Function to extract video URL from a tweet
const extractVideoUrl = async (url) => {
    try {
        const tweetId = extractTweetId(url);
        if (!tweetId) {
            throw new Error('Invalid Tweet URL');
        }

        const bearerToken = process.env.BEARER_TOKEN;

        // Fetch tweet details using Twitter API
        const response = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&media.fields=type,url,variants`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });

        // Check if media exists in the response
        const media = response.data.includes.media.find((item) => item.type === 'video' || item.type === 'animated_gif');
        if (!media) {
            throw new Error('No video or GIF found in the tweet');
        }

        // Extract the video URL with the highest bitrate (best quality)
        const videoVariants = media.variants.filter((variant) => variant.content_type === 'video/mp4');
        if (videoVariants.length === 0) {
            throw new Error('No downloadable video found in the media');
        }

        const bestVideo = videoVariants.reduce((prev, current) => (prev.bitrate > current.bitrate ? prev : current));
        return bestVideo.url;
    } catch (error) {
        console.error('Error fetching video:', error.message);
        throw new Error('Failed to fetch video. Please try again.');
    }
};

module.exports = { extractVideoUrl };
