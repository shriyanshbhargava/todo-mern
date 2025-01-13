import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaStore, FaFile, FaCog, FaFlask, FaUser } from "react-icons/fa";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from "react-icons/tb";

const SidebarContentNew = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("orders");

  const initMenu = (pathName) => {
    const items = document.querySelectorAll("#side-menu a");
    items.forEach((item) => {
      if (pathName === item.pathname) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  useEffect(() => {
    const pathName = location.pathname;
    initMenu(pathName);
  }, [location.pathname]);

  const adminMenuItems = [
    { name: "Leads", icon: FaStore, path: "/leads" },
    { name: "Contract", icon: FaFile, path: "/leads/contract" },
    { name: "All Vendors", icon: FaCog, path: "/all-vendors" },
    { name: "Samples", icon: FaFlask, path: "/samples" },
    { name: "Profile", icon: FaUser, path: "/profile" },
    { name: "Settings", icon: FaCog, path: "/settings" },
  ];

  const userMenuItems = [
    { name: "Orders", icon: FaStore, path: "/orders" },
    { name: "Samples", icon: FaFlask, path: "/samples" },
    { name: "Profile", icon: FaUser, path: "/profile" },
    { name: "Settings", icon: FaCog, path: "/settings" },
  ];

  return (
    <aside className="h-100">
      <nav
        className="d-flex flex-column position-fixed h-100 bg-white border-end shadow-sm"
        style={{
          width: expanded ? "180px" : "60px",
          transition: "width 0.3s ease", // Smooth transition for width
        }}
      >
        {/* Header */}
        <div
          className="d-flex justify-content-between align-items-center p-3 border-bottom"
          style={{
            justifyContent: expanded ? "space-between" : "center",
            transition: "all 0.3s ease",
          }}
        >
          <h5
            className="m-0 text-dark overflow-hidden"
            style={{
              maxWidth: expanded ? "200px" : "0",
              opacity: expanded ? 1 : 0,
              transition: "opacity 0.3s ease, max-width 0.3s ease",
            }}
          ></h5>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="btn btn-light border-0 p-2"
            style={{
              transition: "background-color 0.3s ease",
            }}
          >
            {expanded ? (
              <TbLayoutSidebarLeftCollapseFilled size={20} color="black" />
            ) : (
              <TbLayoutSidebarLeftExpandFilled size={20} color="black" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <ul
          id="side-menu"
          className="nav flex-column py-2 px-2"
          style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: 0,
            padding: "0",
          }}
        >
          {(role === "admin" ? adminMenuItems : userMenuItems).map(
            (item, index) => (
              <li
                key={index}
                className="nav-item"
                style={{
                  marginBottom: "10px",
                  transition: "background-color 0.3s ease", // Smooth transition for background color
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f0f0f0")
                } // Hover background color
                onMouseLeave={(e) => (e.target.style.backgroundColor = "")} // Reset background color
              >
                <Link
                  to={item.path}
                  onClick={() => setActiveTab(item.name.toLowerCase())}
                  className={`nav-link d-flex align-items-center text-dark p-2 rounded ${
                    activeTab === item.name.toLowerCase() ? "bg-light" : ""
                  }`}
                  style={{
                    justifyContent: expanded ? "flex-start" : "center",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                >
                  <item.icon
                    size={20}
                    color="black"
                    className="me-2"
                    style={{
                      marginRight: expanded ? "10px" : "0",
                      transition: "margin-right 0.3s ease",
                    }}
                  />
                  <span
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      transition: "opacity 0.3s ease, max-width 0.3s ease",
                      maxWidth: expanded ? "200px" : "0",
                      opacity: expanded ? 1 : 0,
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarContentNew;
