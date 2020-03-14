import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//Component
import TextFieldGroup from "../common/TextFieldGroup";

//image
import animegirl from "../assets/animegirl.png";

const Register = props => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/profile");
    }
  }, []);

  //SET ERRORS IF THEY EXISTS
  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: username,
      email,
      password,
      password2
    };

    props.registerUser(newUser, props.history);
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="image">
              <img src={animegirl} alt="Anime-Girl" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center mb-5 mt-3 shadow p-3">
              <h1>Register Here!</h1>
              <h6>Create an Account and Explore the Anime World!</h6>
              <form noValidate className="registerForm" onSubmit={handleSubmit}>
                <TextFieldGroup
                  type="text"
                  name="name"
                  value={username}
                  onChange={e => setusername(e.target.value)}
                  placeholder="Name"
                  error={errors.name}
                />
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
                <TextFieldGroup
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={e => setpassword2(e.target.value)}
                  placeholder="Confirm Password"
                  error={errors.password2}
                />
                <button className="btn-reg">Register!</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
