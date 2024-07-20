//First, let's create a new Node.js project and install the necessary dependencies:
//in bash
//mkdir average-calculator
//cd average-calculator
//npm init -y
//npm install express request

const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;
const WINDOW_SIZE = 10;

let windowPrevState = [];
let windowCurrState = [];

app.get('/numbers/:numberid', (req, res) => {
  const numberId = req.params.numberid;
  const thirdPartyApiUrl = `https://api.example.com/numbers?type=${numberId}`;

  // Fetch numbers from the third-party API
  request(thirdPartyApiUrl, { json: true }, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).json({ error: 'Error fetching numbers from third-party API' });
    }

    const numbers = body.numbers;

    // Update the window state
    windowPrevState = windowCurrState;
    windowCurrState = [...windowCurrState, ...numbers];

    // Limit the window size
    windowCurrState = windowCurrState.slice(-WINDOW_SIZE);

    // Calculate the average
    const sum = windowCurrState.reduce((acc, num) => acc + num, 0);
    const avg = parseFloat((sum / windowCurrState.length).toFixed(2));

    // Respond with the current window state and the average
    res.json({
      windowPrevState,
      windowCurrState,
      numbers,
      avg
    });
  });
});

app.listen(PORT, () => {
  console.log(`Average calculator microservice listening on port ${PORT}`);
});

//Replace https://api.example.com/numbers?type=${numberId} with the actual third-party API URL and adjust the request options as needed.

//Microservice can be run using node Average Calculator HTTP Microservice.js
//One can test the microservice using a tool like Postman or CURL. For example: curl http://localhost:3000/numbers/e
