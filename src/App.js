// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import SellerProfile from "./components/SellerProfile";
import AdminBoard from "./components/AdminBoard";
import ItemsFilter from "./components/ItemsFilter";

const App = () => {
  const [adminContent, setAdminContent] = useState(false);
  const [sellerContent, setSellerContent] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setSellerContent(user.roles.includes("ROLE_SELLER"));
      setAdminContent(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logout = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <img
            src="/logo_nav4.png"
            width="162"
            height="41"
            className="d-inline-block align-top"
            alt="opherUp logo"
          />
        </Link>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li> */}

          {sellerContent && (
            <li className="nav-item">
              <Link to={"/seller"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {adminContent && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/items/category/:categoryId" component={ItemsFilter} />
          <Route path="/user" component={UserProfile} />
          <Route path="/seller" component={SellerProfile} />
          <Route path="/admin" component={AdminBoard} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
