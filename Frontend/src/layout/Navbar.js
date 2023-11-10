import React from "react";
import { Link } from "react-router-dom";

// Functional component for the navigation bar
export default function Navbar() {
  // Function to handle the refresh button click
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            RecipeTracker
          </Link>
          <button
            className="btn btn-outline-light"
            onClick={handleRefreshClick}
          >
            Refresh
          </button>
        </div>
      </nav>
    </div>
  );
}
