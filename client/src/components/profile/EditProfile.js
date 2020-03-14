import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";
//Components
import TextFieldGroup from "../common/TextFieldGroup";

const EditProfile = props => {
  const [location, setLocation] = useState("");
  const [hobbies, sethobbies] = useState("");
  const [bio, setbio] = useState("");
  const [youtube, setyoutube] = useState("");
  const [facebook, setfacebook] = useState("");
  const [twitter, settwitter] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [errors, seterrors] = useState({});

  useEffect(() => {
    if (props.profile) {
      const profile = props.profile;

      //Hobbies back to CSV
      const hobbiesCSV = profile.hobbies.join(",").toString();
      profile.hobbies = hobbiesCSV;

      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      setLocation(profile.location);
      sethobbies(profile.hobbies);
      setbio(profile.bio);
      setyoutube(profile.social.youtube);
      setfacebook(profile.social.facebook);
      settwitter(profile.social.twitter);
      setlinkedin(profile.social.linkedin);
      setinstagram(profile.social.instagram);
    }

    seterrors(props.errors);
  }, [props.profile, props.errors]);

  const handleSubmit = e => {
    e.preventDefault();
    const newProfile = {
      location,
      hobbies,
      bio,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    };

    props.createProfile(newProfile, props.history);
  };

  return (
    <div className="wrap">
      <div className="container">
        <div className="row">
          <div className="col md-12">
            <div className="mt-5">
              <Link to="/dashboard" className="btn-reg">
                Go Back
              </Link>
            </div>
            <h2 className="text-center mt-4">Edit Profile</h2>
            <div className="text-center mb-5">
              <form noValidate onSubmit={handleSubmit}>
                <TextFieldGroup
                  placeholder="Enter your Location"
                  type="text"
                  name="location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Hobbies (Comma Seprated) Eg :- anime,manga"
                  type="text"
                  name="hobbies"
                  error={errors.hobbies}
                  value={hobbies}
                  onChange={e => sethobbies(e.target.value)}
                />
                <textarea
                  rows="4"
                  cols="20"
                  placeholder="How about a Brief Bio? (OPTIONAL)"
                  value={bio}
                  onChange={e => setbio(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Youtube Channel (OPTIONAL)"
                  type="text"
                  value={youtube}
                  name="youtube"
                  error={errors.youtube}
                  onChange={e => setyoutube(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Facebook (OPTIONAL)"
                  type="text"
                  name="facebook"
                  value={facebook}
                  error={errors.facebook}
                  onChange={e => setfacebook(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Twitter (OPTIONAL)"
                  type="text"
                  name="twitter"
                  value={twitter}
                  error={errors.twitter}
                  onChange={e => settwitter(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Linkedin Channel (OPTIONAL)"
                  type="text"
                  name="linkedin"
                  value={linkedin ? linkedin : ""}
                  error={errors.linkedin}
                  onChange={e => setlinkedin(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Instagram Channel (OPTIONAL)"
                  type="text"
                  name="instagram"
                  value={instagram ? instagram : ""}
                  error={errors.instagram}
                  onChange={e => setinstagram(e.target.value)}
                />
                <button className="btn-reg">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(EditProfile)
);
