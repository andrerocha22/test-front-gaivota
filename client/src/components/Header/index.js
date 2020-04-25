import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { logoutUser } from "../../actions/index";
import logo from "../../assets/logo192.png";

export default function Header() {
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="container-fluid header">
      <div className="row align-items-center">
        <div className="col-4">
          <img src={logo} className="logo-header" />
        </div>
        <div className="col-4">
          <h1
            onClick={() => {
              window.location.href = "/app/home";
            }}
            className="text-header"
          >
            FARM SYSTEM
          </h1>
        </div>
        <div className="col-4">
          <div className="row align-items-center">
            <h3 className="welcome-text">Welcome {user ? user.name : ""}</h3>
            <button onClick={handleLogout} className="login-button">
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
