import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Ensure you link your CSS

const TwitterDownloader = () => {
    const [url, setUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');

    const handleDownload = async () => {
        setError('');
        setVideoUrl('');
        if (!url) {
            setError('Please enter a valid URL');
            return;
        }

        try {
            const response = await axios.post('https://daily-tools-vrv1.onrender.com/api/twitter/download', { url });
            setVideoUrl(response.data.videoUrl);
        } catch (err) {
            setError('Failed to fetch video. Please try again.');
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <h1 className="title">Srikar Video Downloader</h1>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Paste the Twitter video URL here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button className="download-button" onClick={handleDownload}>
                    Download
                </button>
                {error && <p className="error-message">{error}</p>}
                {videoUrl && (
                    <a
                        href={videoUrl}
                        className="success-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Click here to download video
                    </a>
                )}
            </div>
        </div>
    );
};

export default TwitterDownloader;
