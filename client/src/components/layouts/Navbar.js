import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

//CSS
import "./Navbar.css";

const Navbar = props => {
  const { isAuthenticated, user } = props.auth;
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const handleClick = () => {
    let ul = document.getElementById("ul");
    ul.classList.toggle("show");
  };

  const authLinks = (
    <ul id="ul" className="nav-links">
      <li className="nav-link">
        <Link to="/dashboard" className="nav-item">
          Dashboard
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/profiles" className="nav-item">
          Profiles
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/animes" className="nav-item">
          Animes
        </Link>
      </li>
      <li className="nav-link nav-item" onClick={onLogoutClick}>
        logout
      </li>
    </ul>
  );

  const guestLinks = (
    <ul id="ul" className="nav-links">
      <li className="nav-link">
        <Link to="/" className="nav-item">
          Home
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/register" className="nav-item">
          Register
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/login" className="nav-item">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <div>
      <div className="menu" onClick={handleClick}>
        <i className="fa fa-bars fa-2x"></i>
      </div>
      <header>
        <h1 className="logo">
          <Link to="/" className="nav-item">
            AnimeArcana
          </Link>
        </h1>
        <nav>{props.auth.isAuthenticated ? authLinks : guestLinks}</nav>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
