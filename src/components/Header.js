import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ title, pathTitle, list, pathList, add, pathAdd }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to={pathTitle} className="navbar-brand">
          {title}
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              to={pathList}
              className="nav-link"
              activeClassName="active"
            >
              {list}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={pathAdd} className="nav-link" activeClassName="active">
              {add}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  pathTitle: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
  pathList: PropTypes.string.isRequired,
  add: PropTypes.string.isRequired,
  pathAdd: PropTypes.string.isRequired
};

export default Header;
