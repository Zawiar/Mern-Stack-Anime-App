import React from "react";
import isEmpty from "../../validation/isEmpty";
import defaultAvatar from "../assets/avatar.png";

const ProfileHeader = props => {
  const { profile } = props.profile;

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body wrap text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <div className="text-center">
                  <img
                    className="rounded-circle img-fluid"
                    style={{ maxWidth: "100%" }}
                    src={profile.avatar ? profile.avatar : defaultAvatar}
                    alt="User"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h2 className="display-4 text-center">{props.name}</h2>

              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

              <p>
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fa fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fa fa-facebook fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fa fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fa fa-instagram fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fa fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
