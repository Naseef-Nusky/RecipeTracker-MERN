// Importing necessary modules from React and external libraries
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Functional component for adding a new recipe
export default function AddRecipe() {
  let navigate = useNavigate();

  // State to store the recipe information
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    description: "",
  });

  // Destructuring values from the recipe state
  const { name, ingredients, description } = recipe;

  // Function to update the state when input values change
  const onInputChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('onSubmit called');
    
    // Sending a POST request to create a new recipe
    await axios.post("http://localhost:8080/createRecipe", recipe);
    navigate("/");
  };

  return (
    <div className="container" style={{ marginLeft: '100px', marginTop: '75px' }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
          <h2 className="text-center m-4">Add Recipe</h2>

          {/* Form for adding a new recipe */}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Recipe Name
              </label>
              {/* Input for entering the recipe name */}
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
                placeholder="Enter ingredients, one per line"
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
            {/* Button to submit the form and save the recipe */}
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
