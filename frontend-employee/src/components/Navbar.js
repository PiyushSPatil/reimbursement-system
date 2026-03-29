import { NavLink } from "react-router-dom";
import "../styles/main.css";

export default function Navbar() {
  return (
    <div className="navbar">
      
      {/* Logo */}
      <div className="logo">
        ExpensePro
      </div>

      {/* Links */}
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/add" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Add Expense
        </NavLink>
      </div>

    </div>
  );
}