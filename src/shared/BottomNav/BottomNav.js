import React from "react";
import "./bottomNav.scss";
import { Tech, Menu, Sustainability } from "../../assets/SVGsImportables/SVGs";
import { Link } from "react-router-dom";

const BottomNav = ({ activeTab }) => {
  const bottomNavItems = [
    {
      id: 0,
      title: "menu",
      link: "/menu-options",
      icon: <Menu color="#B0B0B0" />,
      activeIcon: <Menu color="#F89C26" />,
      isActive: true,
    },
    {
      id: 1,
      title: "Sustainability",
      link: "/suppliers",
      icon: <Sustainability color="#B0B0B0" />,
      activeIcon: <Sustainability color="#F89C26" />,
      isActive: false,
    },
    {
      id: 2,
      title: "Tech",
      link: "/tech-screens",
      icon: <Tech color="#B0B0B0" />,
      activeIcon: <Tech color="#F89C26" />,
      isActive: false,
    },
  ];

  return (
    <div className="fa-bottom-nav-wrapper">
      <ul className="fa-bottom-nav">
        {bottomNavItems.map((item, i) => (
          <li
            className={`fa-bottom-nav-item ${
              item.title.toLowerCase() === activeTab.toLowerCase()
                ? "active"
                : ""
            }`}
            key={item.id}
          >
            <Link to={item.link}>
              {item.title.toLowerCase() === activeTab.toLowerCase()
                ? item.activeIcon
                : item.icon}
              <h6>{item.title}</h6>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomNav;
