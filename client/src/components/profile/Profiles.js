import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

const Profiles = props => {
  useEffect(() => {
    props.getProfiles();
  }, []);

  const { profiles, loading } = props.profile;
  let profileItems;

  if (profiles === null || loading) {
    profileItems = (
      <div className="text-center">
        <Spinner />
      </div>
    );
  } else {
    if (profiles.length > 0 && loading === false) {
      profileItems = profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h4>No Profiles Found...</h4>;
    }
  }
  return (
    <div>
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Fellow Otaku's</h1>
              <p className="lead text-center">Connect to Others</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
