import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Functional component for displaying a list of recipes
export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  // Effect hook to load recipes when the component mounts
  useEffect(() => {
    loadRecipes();
  }, []);

  // Function to fetch and set the list of recipes
  const loadRecipes = async () => {
    try {
      const result = await axios.get('http://localhost:8080/allRecipes');
      setRecipes(result.data);
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  // Function to delete a recipe
  const deleteRecipe = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete the recipe?'
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/deleteRecipe/${id}`);
        loadRecipes();
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-3">
        {/* Link to navigate to the "Add Recipe" page */}
        <Link className="btn btn-success" to="/addrecipe">
          Add Recipe
        </Link>
      </div>
      <div className="py-4">
        {/* Table to display the list of recipes */}
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col" style={{ width: '25%' }}>
                Recipe Name
              </th>
              <th scope="col" style={{ width: '25%' }}>
                Ingredients
              </th>
              <th scope="col" style={{ width: '25%' }}>
                Description
              </th>
              <th scope="col" style={{ width: '25%' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through the recipes to display each in a row */}
            {recipes.map((recipe, index) => (
              <tr key={recipe._id}>
                <td style={{ width: '25%' }}>{recipe.name}</td>
                <td style={{ width: '25%' }}>{recipe.ingredients}</td>
                <td style={{ width: '25%' }}>{recipe.description}</td>
                <td style={{ width: '25%' }}>
                  {/* Links and buttons for viewing, editing, and deleting a recipe */}
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewrecipe/${recipe._id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editrecipe/${recipe._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
