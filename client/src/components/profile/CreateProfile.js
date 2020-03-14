import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profileActions";
//Components
import TextFieldGroup from "../common/TextFieldGroup";
const CreateProfile = props => {
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
    seterrors(props.errors);
  }, [props.errors]);

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
            <h2 className="text-center mt-4">
              Let's Create an Awesome Profile
            </h2>
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
                  value={linkedin}
                  error={errors.linkedin}
                  onChange={e => setlinkedin(e.target.value)}
                />
                <TextFieldGroup
                  placeholder="Instagram Channel (OPTIONAL)"
                  type="text"
                  name="instagram"
                  value={instagram}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
