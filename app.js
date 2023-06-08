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



const currentDate = new Date();

// Get the current date
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
const day = currentDate.getDate();

// Get the current time
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();



// Handle form submission
    app.post('/submit', (req, res) => {
      const name = req.body.name;
      
        const number = req.body.number;
        const subject = req.body.subject;
        const address = req.body.address1;
        const message = req.body.message;
       let data = `
          (OM_SAIRAM_GARDEN_SERVICES.)

        ClientId: 12345,
        ServiceName": ${subject},
        ServiceDate": ${year}-${month}-${day},
        ServiceTime": ${hours}:${minutes}:${seconds},
        Address": ${address},
        ContactName": ${name},
        ContactPhone": ${number},
        AdditionalInfo":${message}\nPlease bring your own equipment.
      
      
       `
      
        client.messages.create({
          body: data,
          to: '+919834245726', // Text your number
          from: '+13613219126', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
        res.sendFile(path.join(directory, 'contact.html'));
        console.log('Submitted data:', data);
      });
      

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});