const axios = require('axios');

// Define the options for the API request
const options = {
  method: 'POST',
  url: 'https://chatgpt-42.p.rapidapi.com/geminipro',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '09aaa4131amsh766c54ba8fa7427p16e08bjsnd2bc086c9eff',
    'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: 'hello' // You can change this to the actual message received from the user
      }
    ],
    web_access: false
  }
};

// Function to interact with the API
async function interactWithAI() {
  try {
    const response = await axios.request(options);
    console.log(response.data); // Output the response from the API
    return response.data; // Return the data received from the API if needed
  } catch (error) {
    console.error(error); // Handle any errors that occur during the API request
    throw error; // Propagate the error to the caller if necessary
  }
}

module.exports = { interactWithAI };