const mongoose = require('mongoose');

// Defining the recipe schema using mongoose
const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a recipe name'],
    },
    ingredients: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creating a Recipe model based on the defined schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
