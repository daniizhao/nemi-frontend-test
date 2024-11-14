const express = require('express');
const app = express();

const fs = require('fs');
const bodyParser = require('body-parser');

// handling CORS
app.use((req, res, next) => {
  req.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin",
             "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// route for handling requests from the Angular client
app.get('/api/services', (req, res) => {
  var file = fs.readFileSync('./public/data/services.json');
  res.status(200).json({
    data: JSON.parse(file)
  })
});

app.post('/api/services/create', (req, res) => {
  var file = fs.readFileSync('./public/data/services.json');
  var parsedFile = JSON.parse(file);
  if (parsedFile.find(obj => obj.id === req.body.id)) {
    // ID already exists
    res.status(409).json({
      message: "Service with Id already exists."
    })
  } else {
    parsedFile.push(req.body);
    fs.writeFileSync('./public/data/services.json', JSON.stringify(parsedFile));
    res.status(200).json({
      data: parsedFile
    })
  }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
