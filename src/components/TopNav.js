import { NavLink } from "react-router-dom";

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
  return (
    <ul className="top-menu">
      {navItems.map((item) => (
        <li key={item.id} className="top-menu__item">
          <NavLink className={customNavLinkStyle} to={item.path}>
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default TopNav;
