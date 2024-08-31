// Function to calculate bot uptime
function getUptime(startTime) {
  const now = new Date();
  const uptime = now - startTime;
  const seconds = Math.floor(uptime / 1000) % 60;
  const minutes = Math.floor(uptime / (1000 * 60)) % 60;
  const hours = Math.floor(uptime / (1000 * 60 * 60)) % 24;
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

module.exports = { getUptime };