const express = require('express');

const router = express.Router();

const recipeController = require('../controllers/recipeController');

// Route to get all recipes
router.get('/allRecipes', recipeController.getRecipes);

// Route to get a specific recipe by ID
router.get('/recipe/:id', recipeController.getRecipeById);

// Route to create a new recipe
router.post('/createRecipe', recipeController.createRecipe);

// Route to update a recipe by ID
router.put('/updateRecipe/:id', recipeController.updateRecipe);

// Route to delete a recipe by ID
router.delete('/deleteRecipe/:id', recipeController.deleteRecipe);

module.exports = router;

