const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:34899@testdb.torduzw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose schema for your data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Create a new FormData document
  const newFormData = new FormData({
    name,
    email,
    message,
  });

  // Save the document to MongoDB
  newFormData.save()
    .then(() => {
      res.send('Data submitted successfully!');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving data.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});