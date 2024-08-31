const fs = require('fs');
const path = require('path');
const Database = require('./database');

function getRandomGifFromFolder(gifsFolder) {
  // Get a list of GIF files in the specified folder
  const gifFiles = fs.readdirSync(gifsFolder);

  if (gifFiles.length > 0) {
    // Select a random GIF from the list
    const randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)];

    // Get the full path to the selected GIF
    const gifPath = path.join(gifsFolder, randomGif);
    return gifPath;
  } else {
    // If the folder is empty or doesn't exist
    return null;
  }
}

async function sendAutomaticGreeting(bot, chatId) {
  // Check if the current time is between 9 AM and 5 PM
  const currentHour = new Date().getHours();
  if (currentHour >= 9 && currentHour < 17) {
    // Specify the folder where your GIFs are stored
    const gifsFolder = path.join(__dirname, 'gifs');

    // Get a random GIF path from the folder
    const gifPath = getRandomGifFromFolder(gifsFolder);

    if (gifPath) {
      // Send a greeting message with the random GIF
      bot.sendMessage(chatId, 'Hello! Welcome to the bot. How can I assist you today?');
      bot.sendDocument(chatId, gifPath);
    } else {
      // If the GIF folder is empty or doesn't exist
      bot.sendMessage(chatId, 'Hello! Welcome to the bot. However, no GIFs are available at the moment.');
    }
  }
}

module.exports = (bot, adminChatId) => {
  // Your existing setup code
  
  // Set up an interval to send greetings every 5 minutes
  setInterval(() => {
    // Replace with the actual chat ID where you want to send the greetings
    const someChatId = '6059491264';
    sendAutomaticGreeting(bot, someChatId);
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
};