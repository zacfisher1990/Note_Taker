// dependencies
const express = require('express');
const path =require('path');
const fs = require('fs');

//express app
const PORT = process.env.PORT || 3001;
const app = express();

// middleware for parsing JSON and urlencoed form data
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST request
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      let userNote = req.body;
      userNote.id = Math.floor(Math.random() * 5000);
      notes.push(userNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err, data) => {
        res.json(userNote);
    });
    }); 
  });

  // GET request for notes
  app.get('api/notes/:id', (req, res) =>{
    res.json(notes[req.params.id]);
  });
  // 
  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      res.json(notes);
    });
  });
  
  // GET route for notes.html
  app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '/notes.html'))
  });
  
  // GET route for index.html
  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '/index.html'));
  });   
  
  app.listen(PORT, () => {
      console.log(`App listening on PORT: ${PORT}`);
  });