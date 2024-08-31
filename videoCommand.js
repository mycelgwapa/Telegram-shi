// videoCommands.js

const axios = require('axios');

async function handleVideoUpload(bot, msg, token) {
    try {
        const chatId = msg.chat.id;
        const fileId = msg.video.file_id;

        // Get information about the video file
        const fileDetails = await bot.getFile(fileId);

        // Download the video file from Telegram
        const videoUrl = `https://api.telegram.org/file/bot${token}/${fileDetails.file_path}`;

        // Make a request to your API endpoint to upload the video
        const response = await axios.post('http://localhost:7823/upload', { videoUrl });

        // Respond to the user
        bot.sendMessage(chatId, 'Video uploaded successfully!');
    } catch (error) {
        console.error('Error uploading video:', error);
        bot.sendMessage(chatId, 'An error occurred while uploading the video.');
    }
}

module.exports = { handleVideoUpload };
