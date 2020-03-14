import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProfileAnimanga = props => {
  const animanga = props.animanga;
  return (
    <div>
      <div className="container">
        {animanga.length > 0 ? <h2 className="text-center">ANIMANGA</h2> : null}
        <div className="row">
          {animanga.map(animang => {
            return (
              <div className="col-md-6 shadow mb-5" key={animang._id}>
                <h5 className="text-center mt-3">
                  Type : {animang.typeofMaterial}
                </h5>
                <div className="text-center">
                  <img
                    src={animang.image}
                    alt={animang.title}
                    style={{ maxWidth: "100%", maxHeight: "auto" }}
                    className="img-fluid"
                  />
                </div>
                <div className="text-center mt-5">
                  <h4>{animang.title}</h4>
                  <p className="text-justify">{animang.synopsis}</p>
                  <div className="row text-center">
                    <div className="col-md-12">
                      <p>
                        PriorityLevel &nbsp; &nbsp;
                        <span className="badge badge-success p-2">
                          {animang.priorityLevel}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-md-12">
                      <p>
                        Watched &nbsp; &nbsp;
                        <span className="badge badge-success p-2">
                          {animang.watched ? "true" : "false"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row text-center">
                    <div className="col-md-12">
                      <p>
                        Added At &nbsp; &nbsp;
                        <span className="badge badge-success p-2">
                          {animang.addedAt}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ProfileAnimanga.propTypes = {
  animanga: PropTypes.array.isRequired
};

export default connect(null)(ProfileAnimanga);
