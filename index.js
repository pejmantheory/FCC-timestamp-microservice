// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

// your first API endpoint...
app.get("/api/:date?", function (req, res) { // Changed route path to include optional date parameter
  const dateString = req.params.date;
  let date;

  if (dateString) {
    const isTimestamp = /^\d+$/.test(dateString);
    date = isTimestamp ? new Date(+dateString) : new Date(dateString);
  } else {
    date = new Date(); // Return current date when the date parameter is not provided
  }

  if (isInvalidDate(date)) {
    res.json({error: "Invalid Date"})
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

