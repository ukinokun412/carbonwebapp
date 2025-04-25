import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">     
        <h2>Carbon Emission Forecasting</h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/calendar" style={{ color: "#fff", textDecoration: "none" }}>
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/imports" style={{ color: "#fff", textDecoration: "none" }}>
            Import/Export Data
          </Link>
        </li>
          <Link to="/charts" style={{ color: "#fff", textDecoration: "none" }}>
            Charts
          </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
