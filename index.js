require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { startServer } = require('./server');
const Database = require('./database');
const { interactWithAI } = require('./no-prefix');
const setupGreetingsCommand = require('./greetings');
const setupGenImageCommand = require('./genimage');
const { getTimeAndTimezone } = require('./time');
const {getUptime} = require('./uptime');


// replace the value below with the Telegram token you receive from @BotFather
const token = '6764705133:AAEe2tPeaQQ6uMJiT2d2N2yxxHhXetV9rss';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: { interval: 1000 } }); // Polling interval of 1 second

// Connect to the SQLite database
const db = new Database();

// Define the admin chat ID
const adminChatId = '6059491264';

// Call the setupGreetingsCommand function to set up the greetings module
setupGreetingsCommand(bot, adminChatId);
setupGenImageCommand(bot);

async function setup() {
  try {
    await startServer(); // Make sure startServer is correctly implemented
    console.log('SERVER RUNNING🏃');

    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      console.log('Received /start command');
      bot.sendMessage(chatId, 'Welcome! Type /help to see available commands.');

      // Example: Insert user into the database
      const user_id = msg.from.id;
      const username = msg.from.username;
      db.insertUser(user_id, username);
    });

    bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      console.log('Received /help command');
      const helpMessage = `
    ╭ ─❍ INFO 👁️👄👁️
    | ─ EDUC📖
    |   - Ai - [ no prefix ]
    |    - Gpt - [ powered by gpt 4 ]
    |    - llamaa - [ powered by the              
    |      latest version of llamaa ]
    |  ─ EVENTS✨
    |    - Custom.js
    |
    |  ─ INFO 🔥☀️
    |    - [ PREFIX ] [ / ]
    |    - BOT NAME : BOT_NAME
    |    - OWNER💦 : YOUR_ID OR LINK
    |    - ADMINS💋 : THEM_IDS OR NAMES
    |    - UPTIME🕜 : CONNECT IT TO THE DB
    |    - USERS🧟 : NUMBER_OF_USERS
    |    - REPO : GITHUB REPOSITORY
    |   - VERSION : ver 1
    |    - PERMISSIONS : 3
    |    - DONATE💸 : put your link the donate
    |    - CONTRIBUTORS🧑‍💻 : can use code for 
    |     contribution
    ╰ ─────❍✨
    `;

      bot.sendMessage(chatId, helpMessage);
    });

    // Handle incoming messages
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      console.log(`Received message from ${chatId}: ${msg.text}`);
      

      
      // Check if the message starts with the "/ai" command
      if (msg.text.toLowerCase().startsWith('/ai')) {
        // Send auto-reaction message
        bot.sendMessage(chatId, 'ANSWERING YOUR QUESTION ⏳');
      }
    });

    bot.onText(/\/time/, (msg) => {
      const chatId = msg.chat.id;
      console.log('Received /time command');
      const { time, timezone } = getTimeAndTimezone();
      bot.sendMessage(chatId, `Current time: ${time}\nTimezone: ${timezone}`);
    });

    bot.onText(/\/uptime/, (msg) => {
      const chatId = msg.chat.id;
      console.log('Received /uptime command');
      const uptime = getUptime(startTime);
      bot.sendMessage(chatId, `Bot uptime: ${uptime}`);
    });


    bot.on('video', (msg) => {
      handleVideoUpload(bot, msg, token);
    });
    
    
  } catch (error) {
    console.error('ERROR IN SETUP☠️', error);
  }
}

setup();

// Handle shutdown gracefully by closing the database connection
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});

console.log('BOT RUNNING🏃');