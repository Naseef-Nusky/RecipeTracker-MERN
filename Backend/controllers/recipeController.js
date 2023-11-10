const Recipe = require('../models/recipeModel');

const recipeController = {
    // Get all recipes
    getRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.find({});
            res.status(200).json(recipes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a recipe by ID
    getRecipeById: async (req, res) => {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findById(id);
            if (!recipe) {
                return res.status(404).json({ message: `Cannot find any recipe with ID ${id}` });
            }
            res.status(200).json(recipe);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new recipe
    createRecipe: async (req, res) => {
        try {
            const recipe = await Recipe.create(req.body);
            res.status(200).json({ message: "Recipe added successfully", recipe });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    },

    // Update a recipe by ID
    updateRecipe: async (req, res) => {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findByIdAndUpdate(id, req.body);
            if (!recipe) {
                return res.status(404).json({ message: `Cannot find any recipe with ID ${id}` });
            }
            const updatedRecipe = await Recipe.findById(id);
            res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a recipe by ID
    deleteRecipe: async (req, res) => {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findByIdAndDelete(id);
            if (!recipe) {
                return res.status(404).json({ message: `Cannot find any recipe with ID ${id}` });
            }
            res.status(200).json({ message: "Recipe deleted successfully" });
        } catch (error) {
            console.error("Error deleting recipe:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = recipeController;
