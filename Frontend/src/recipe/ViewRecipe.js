import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Functional component for viewing details of a recipe
export default function ViewRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    description: "",
  });

  // Extracting the recipe ID from the URL parameters
  const { id } = useParams();

  // load the recipe details when the component mounts
  useEffect(() => {
    loadRecipe();
  }, []);

  // Function to fetch and set the recipe details
  const loadRecipe = async () => {
    const result = await axios.get(`http://localhost:8080/recipe/${id}`);
    
    setRecipe(result.data);
  };

  return (
    <div className="container" style={{ marginLeft: '100px', marginTop: '75px' }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow">
          <h2 className="text-center m-4">Recipe Details</h2>
          <div className="card">
            <div className="card-header">
              Details of Recipe: {recipe.name}
              <ul className="list-group list-group-flush">
                <li className="list-group-item" style={{ textAlign: 'left' }}>
                  <b>Recipe Name:</b>
                  {recipe.name}
                </li>
                <li className="list-group-item" style={{ textAlign: 'left' }}>
                  <b>Ingredients:</b>
                  {recipe.ingredients}
                </li>
                <li className="list-group-item" style={{ textAlign: 'left' }}>
                  <b>Description:</b>
                  {recipe.description}
                </li>
              </ul>
            </div>
          </div>
          {/* Link to navigate back to the home page */}
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
