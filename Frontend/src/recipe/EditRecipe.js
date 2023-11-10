import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Functional component for editing a recipe
export default function EditRecipe() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    description: "",
  });

  const { name, ingredients, description } = recipe;

  // Function to update the state when input values change
  const onInputChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadRecipe();
  }, []);

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Sending a PUT request to update the recipe
    await axios.put(`http://localhost:8080/updateRecipe/${id}`, recipe);
    
    navigate("/");
  };

  // Function to load the existing recipe data for editing
  const loadRecipe = async () => {
    const result = await axios.get(`http://localhost:8080/recipe/${id}`);
    result.data.ingredients = result.data.ingredients.replace(/,/g, '\n');

    setRecipe(result.data);
  };

  return (
    <div className="container" style={{ marginLeft: '100px', marginTop: '75px' }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-3 shadow">
          <h2 className="text-center m-4">Edit Recipe</h2>

          {/* Form for editing the recipe */}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Recipe Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter recipe name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                className="form-control"
                placeholder="Enter ingredients (one per line)"
                name="ingredients"
                value={ingredients}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Enter description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* Button to submit the form and save the updated recipe */}
            <button type="submit" className="btn btn-outline-primary">
              Save Recipe
            </button>
            {/* Link to cancel and go back to the recipe list page */}
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
