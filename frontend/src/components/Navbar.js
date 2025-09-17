import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <Link to="/" style={{ margin: "10px", color: "white" }}>Home</Link>
      <Link to="/login" style={{ margin: "10px", color: "white" }}>Login</Link>
      <Link to="/dashboard" style={{ margin: "10px", color: "white" }}>Dashboard</Link>
      <Link to="/tasks" style={{ margin: "10px", color: "white" }}>Tasks</Link>
      <Link to="/wallet" style={{ margin: "10px", color: "white" }}>Wallet</Link>
    </nav>
  );
}

export default Navbar;
