const axios = require('axios');

function setupGenImageCommand(bot) {
  bot.onText(/\/genimage (.+)/, async (msg, match) => {
    const searchTerm = match[1]; // Extract the search term from the command

    try {
      const options = {
        method: 'GET',
        url: 'https://img4me.p.rapidapi.com/',
        params: {
          text: searchTerm, // Use the search term as the text for the image
          font: 'trebuchet',
          size: '12',
          fcolor: '000000',
          bcolor: 'FFFFFF',
          type: 'png'
        },
        headers: {
          'X-RapidAPI-Key': '09aaa4131amsh766c54ba8fa7427p16e08bjsnd2bc086c9eff',
          'X-RapidAPI-Host': 'img4me.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      const imageUrl = response.data; // Assuming the API directly returns the image URL

      // Send the image as a photo message
      bot.sendPhoto(msg.chat.id, imageUrl, { caption: 'Generated image' });
    } catch (error) {
      console.error(error);
      bot.sendMessage(msg.chat.id, 'Error generating image. Please try again later.');
    }
  });
}

module.exports = setupGenImageCommand;
