import React, { useEffect } from "react";
import lilth from "../assets/hiclipart.com (1).png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//CSS
import "./Landing.css";

const Landing = props => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/profile");
    }
  }, []);
  return (
    <div className="wrap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="image">
              <img src={lilth} alt="Kirito" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-7">
            <div className="content shadow p-5">
              <h6>Endulge in your Otaku Persona</h6>
              <h1>Come Join the Adventure</h1>
              <Link to="/register" className="btn-reg">
                Register Now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
