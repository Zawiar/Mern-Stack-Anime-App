import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, deleteProfileandUser } from "../../actions/profileActions";
import PropTypes from "prop-types";
import ProfileButton from "./ProfileButton";
import AnimangaDash from "./AnimangaDash";

//Spinner
import Spinner from "../common/Spinner";

const Dashboard = props => {
  useEffect(() => {
    props.getProfile();
  }, []);

  const { user } = props.auth;
  const { profile, loading } = props.profile;

  const handleDelete = () => {
    props.deleteProfileandUser();
  };

  let content;
  if (profile === null || loading) {
    content = (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  } else {
    //check if looged in user has profile data
    if (loading === false && Object.keys(profile).length > 0) {
      content = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center mt-3 mb-4">
                Welcome {props.auth.user.name}!
              </h3>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Account and Profile
              </button>
              <div className="text-center">
                <ProfileButton />;
              </div>
              <div className="text-center">
                <AnimangaDash profile={profile} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="m-5">
                <h2>Welcome {props.auth.user.name}!</h2>
                <p>
                  {props.auth.user.name}, Seems like you are New Here, Let us
                  Help you create a Profile that will stand out!
                  <br />
                  <br />
                  and EXPLORE THE OTAKU WORLD...
                </p>
                <div className="mt-5">
                  <Link to="/create-profile" className="btn-reg">
                    Create Profile!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{content}</div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteProfileandUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile,
  loading: state.profile.loading
});

export default connect(mapStateToProps, { getProfile, deleteProfileandUser })(
  Dashboard
);
