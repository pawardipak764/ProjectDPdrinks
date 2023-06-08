const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
//sms api
const accountSid = 'ACda44160641cae316525c11f8d6fd141f';
const authToken = '5ff073cab97eb6375b667c0ea071a1fa';
const client = require('twilio')(accountSid, authToken);


// Set up body-parser middleware
app.use(bodyParser.urlencoded());

// Serve static files (including the HTML file)
const directory = path.join(__dirname, './');
app.use(express.static(directory));// create public forder and add html file

// Handle form submission
    app.post('/submit', (req, res) => {
      const name = req.body.name;
      
        const email = req.body.email;
        const subject = req.body.subject;

        const message = req.body.message;
       
      
        client.messages.create({
          body: message,
          to: '+919834245726', // Text your number
          from: '+13613219126', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
        res.send("Form submitted successfully")
        console.log('Submitted data:', message);
      });
      

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});