import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = React.useState(path);

  return (
    <div className="bg-[#2D3748] -ml-5 pl-0    ">
      <div className=" mx-5 flex items-center justify-between max-w-6xl lg:mx-auto text-white font-semibold h-[65px]   ">
        <Link to={"/"}>
          <div
            onClick={(e) => setActiveItem("home")}
            className={`${
              activeItem === "home" && "bg-[#242b35]  rounded-lg "
            } cursor-pointer px-3 py-1`}
          >
            {user ? user.username : "Home"}
          </div>
        </Link>

        <div className="flex space-x-8">
          <Link to={"/login"}>
            <div
              onClick={(e) => setActiveItem(user ? logout : "login")}
              className={`${
                activeItem === "login" && "bg-[#242b35]  rounded-lg  "
              } cursor-pointer px-3 py-1`}
            >
              {user ? "Logout" : "Login"}
            </div>
          </Link>
          {!user && (
            <Link to={"/register"}>
              <div
                onClick={(e) => setActiveItem("register")}
                className={`${
                  activeItem === "register" && "bg-[#242b35]  rounded-lg"
                } cursor-pointer px-3 py-1`}
              >
                Register
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
