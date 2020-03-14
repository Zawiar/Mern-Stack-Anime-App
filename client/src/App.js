import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { getProfile } from "./actions/profileActions";
import SetAuthToken from "./components/utils/SetAuthToken";
import PrivateRoute from "./private/PrivateRoute";
import store from "./store";

//Components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/profile/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import MyProfile from "./components/profile/MyProfile";
import Profiles from "./components/profile/Profiles";
import SingleProfile from "./components/profile/SingleProfile";
import Jikan from "./components/JikanApi/Jikan";
import SingleAnime from "./components/JikanApi/SingleAnime";

//Layout
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

const App = () => {
  //doing someshit about login out and all that
  if (localStorage.JwtToken) {
    //set auth token as header
    SetAuthToken(localStorage.JwtToken);
    //decode token and get user info
    const decoded = jwt_decode(localStorage.JwtToken);
    //set user  and is Authenticated
    store.dispatch(setCurrentUser(decoded));

    //check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      //logout user
      store.dispatch({ type: "CLEAR_PROFILE" });
      store.dispatch(logoutUser());
      //redirect to login
      window.location.href = "/login";
    }
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute
            path="/create-profile"
            component={CreateProfile}
            exact
          />
          <PrivateRoute path="/edit-profile" component={EditProfile} exact />
          <PrivateRoute path="/profile" exact component={MyProfile} />
          <Route path="/profiles" exact component={Profiles} />
          <Route
            path="/profiles/username/:handle"
            exact
            component={SingleProfile}
          />
          <Route path="/animes" component={Jikan} exact />

          <Route path="/animes/:id" exact component={SingleAnime} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
