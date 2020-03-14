import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileAnimanga from "./ProfileAnimanga";

//Spinner
import Spinner from "../common/Spinner";

const MyProfile = props => {
  useEffect(() => {
    props.getProfile();
  }, []);

  const { profile, loading } = props.profile;
  console.log(profile.user);

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
              <ProfileHeader profile={props.profile} name={props.name} />
              <ProfileAbout
                profile={props.profile}
                name={props.name}
                hobbies={props.hobbies}
              />
              <ProfileAnimanga animanga={props.animanga} />
            </div>
          </div>
        </div>
      );
    }
  }
  return <div>{content}</div>;
};

MyProfile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  hobbies: PropTypes.array.isRequired,
  animanga: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  name: state.profile.name,
  hobbies: state.profile.hobbies,
  animanga: state.profile.animanga
});

export default connect(mapStateToProps, { getProfile })(MyProfile);
