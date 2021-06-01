// import logo from './logo.svg';
import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import AddPost from "./components/AddPost";
import SellerProfile from "./components/SellerProfile";
import AdminBoard from "./components/AdminBoard";
import ItemsByCategory from "./components/ItemsByCategory";
import ItemDetails from "./components/ItemDetails";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <div id="content-wrap" className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/:userId" component={Profile} />
          <Route
            path="/items/category/:categoryId"
            component={ItemsByCategory}
          />
          <Route path="/details/:itemId" component={ItemDetails} />
          <Route path="/add-post/:userId" component={AddPost} />
          <Route path="/seller" component={SellerProfile} />
          <Route path="/admin" component={AdminBoard} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
