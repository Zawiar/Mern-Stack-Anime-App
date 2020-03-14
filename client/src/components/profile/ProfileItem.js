import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";
import DefaultAvatar from "../assets/avatar.png";

const ProfileItem = props => {
  const { profile } = props;
  return (
    <div>
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={profile.avatar ? profile.avatar : DefaultAvatar}
              alt="User"
              className="rounded-circle img-fluid"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>
              <Link to={`/profiles/username/${profile.user.name}`}>
                {profile.user.name}
              </Link>
            </h3>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h3>HOBBIES</h3>
            <ul className="list-group">
              {profile.hobbies.slice(0, 4).map((hobby, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
