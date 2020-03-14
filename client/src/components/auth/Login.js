import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//Component
import TextFieldGroup from "../common/TextFieldGroup";

//image
import animegirl from "../assets/animegirl.png";

import "./Login.css";

const Login = props => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, []);

  //SET ERRORS IF THEY EXISTS
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    setErrors(props.errors);
  }, [props.auth.isAuthenticated, props.errors]);
  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      email,
      password
    };

    props.loginUser(newUser, props.history);
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="image">
              <img src={animegirl} alt="Anime Girl" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center mb-4 mt-3 shadow p-3">
              <h1>Login Here!</h1>
              <h6>Explore the Anime World!</h6>
              <form noValidate className="registerForm" onSubmit={handleSubmit}>
                <TextFieldGroup
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  placeholder="Email"
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                  placeholder="Password"
                  error={errors.password}
                />

                <button className="btn-reg">Login!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
