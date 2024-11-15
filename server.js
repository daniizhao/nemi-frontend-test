const express = require('express');
const app = express();

const fs = require('fs');
const bodyParser = require('body-parser');

// handling CORS
app.use((req, res, next) => {
  req.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
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

app.get('/api/services/:id', (req, res) => {
  var file = fs.readFileSync('./public/data/services.json');
  var parsedFile = JSON.parse(file);
  var serviceIndex = parsedFile.findIndex(serv => serv.id == req.params.id);
  if (serviceIndex === -1) {
    res.status(400).json({
      message: "Service doesn't exist."
    })
  } else {
    res.status(200).json({
      data: parsedFile[serviceIndex]
    })
  }
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
});

app.delete('/api/services/:id/delete', (req, res) => {
  var file = fs.readFileSync('./public/data/services.json');
  var parsedFile = JSON.parse(file);
  var deleteIndex = parsedFile.findIndex(serv => serv.id == req.params.id);
  if (deleteIndex !== -1) {
    parsedFile.splice(deleteIndex, 1);
    fs.writeFileSync('./public/data/services.json', JSON.stringify(parsedFile));
    res.status(200).json();
  } else {
    res.status(400).json({
      message: "Service doesn't exist."
    })
  }
});

app.put('/api/services/:id/edit', (req, res) => {
  var file = fs.readFileSync('./public/data/services.json');
  var parsedFile = JSON.parse(file);
  var editIndex = parsedFile.findIndex(serv => serv.id == req.params.id);
  if (editIndex !== -1) {
    parsedFile[editIndex] = req.body;
    fs.writeFileSync('./public/data/services.json', JSON.stringify(parsedFile));
    res.status(200).json();
  } else {
    res.status(400).json({
      message: "Service doesn't exist."
    })
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
