import React from "react";
import { Link } from "react-router-dom";
const ProfileActions = () => {
  return (
    <div className="btn-group mb-3">
      <Link to="/edit-profile" className="btn btn-primary">
        Edit Profile
      </Link>
      <Link to="/animes" className="btn btn-secondary">
        Search Anime
      </Link>
      <Link to="/profile" className="btn btn-primary">
        Your Profile
      </Link>
    </div>
  );
};

export default ProfileActions;
