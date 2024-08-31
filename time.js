const moment = require('moment-timezone');

// Function to get the current time and timezone
function getTimeAndTimezone() {
  const now = moment().tz('Asia/Manila');
  const time = now.format('HH:mm:ss'); // Adjust the format as needed
  const timezone = now.tz();
  return { time, timezone };
}

module.exports = { getTimeAndTimezone };