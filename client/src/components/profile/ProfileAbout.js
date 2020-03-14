import React from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/isEmpty";

const ProfileAbout = props => {
  const { profile } = props;
  const { hobbies } = props;
  console.log(profile.profile.bio);
  //GET firtname
  const firstname = props.name.trim().split(" ")[0];

  //Skill list
  const hobbys = hobbies.map((hobby, index) => (
    <div className="p-3" key={index}>
      <i className="fa fa-check" /> {hobby}
    </div>
  ));
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstname}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.profile.bio) ? (
                <span>{firstname} does not have a bio</span>
              ) : (
                <span>{profile.profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Hobbies</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {hobbys}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default ProfileAbout;
