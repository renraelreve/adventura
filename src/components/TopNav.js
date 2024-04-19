import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../store/auth-context";

import Card from "./Card";

const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
  },
  {
    id: 3,
    name: "Contact Us",
    path: "/contact",
  },
  {
    id: 4,
    name: "Login",
    path: "/login",
  },
  {
    id: 5,
    name: "Favourites",
    path: "/favourites",
  },
];

const customNavLinkStyle = ({ isActive }) =>
  isActive ? "nav-item-active" : "nav-item";

function TopNav() {
  return (
    <nav className="topbar">
      <Card>
        <NavItems />
      </Card>
    </nav>
  );
}

function NavItems() {
  const { isLoggedIn, logoutHandler } = useContext(AuthContext);

  return (
    <>
      <ul className="top-menu">
        {navItems.map((item) => (
          <li key={item.id} className="top-menu__item">
            {/* Show Login menu item only if not logged in */}
            {!isLoggedIn && item.id < 5 && (
              <NavLink className={customNavLinkStyle} to={item.path}>
                {item.name}
              </NavLink>
            )}
            {/* Show Favourites and Logout menu item only if logged in */}
            {isLoggedIn && item.id !== 4 && (
              <NavLink className={customNavLinkStyle} to={item.path}>
                {item.name}
              </NavLink>
            )}
          </li>
        ))}
        {isLoggedIn && (
          <li className="top-menu__item" onClick={logoutHandler}>
            <span className="nav-item">Logout</span>
          </li>
        )}
      </ul>
    </>
  );
}

export default TopNav;
