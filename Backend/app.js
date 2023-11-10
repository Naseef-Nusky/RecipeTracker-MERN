const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/', recipeRoutes);

// Connecting to MongoDB database
mongoose
  .connect(
    'mongodb+srv://Recipe:QwFilcDoCjNKB4Cp@cluster0.ljutmce.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(8080, () => {
      console.log('Server running on port 8080');
    });
  })
  .catch((error) => {
    console.log(error);
  });
