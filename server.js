// server.js
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

app.get("/api/:date?", (req,res) => {
  console.log("hit , req.params.date: "+req.params.date);
  console.log(typeof req.params.date)
  var dat = new Date(req.params.date);
  console.log("dat: "+dat)
  if(req.params.date !== undefined){
    if(isNaN(dat.getTime())){
      res.json({error : "Invalid Date"});
    }
    else{
      res.json({"unix" : dat.getTime(), "utc" : dat});
    }
  }else{
    res.json({"unix" : Date.parse(new Date()), "utc" : new Date()});
  }
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
