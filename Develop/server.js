const express = require('express');
const path =require('path');
const termData = require('./terms.json');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  
  app.get('api/notes/:id', (req, res) =>{
    res.json(notes[req.params.id]);
  });
  
  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      var notes = JSON.parse(data);
      res.json(notes);
    });
  });
  
  app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '/notes.html'))
  });
  
  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '/index.html'));
  });   
  
  app.listen(PORT, () => {
      console.log(`App listening on PORT: ${PORT}`);
  });