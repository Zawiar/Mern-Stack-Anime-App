import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeAnimanga } from "../../actions/profileActions";
import AnimangaModal from "../JikanApi/AnimangaModal";
import PropTypes from "prop-types";

const AnimangaDash = props => {
  const [selected, setSelected] = useState(undefined);
  const [animangas, setAnimangas] = useState([]);
  const [updateId, setupdateId] = useState("");
  const { animanga } = props.profile;
  useEffect(() => {
    setAnimangas(animanga);
  }, [props.profile]);
  const remove = id => {
    props.removeAnimanga(id);
  };

  const handleCloseModal = () => {
    setSelected(undefined);
  };

  const update = id => {
    setSelected(true);
    setupdateId(id);
  };

  return (
    <div>
      <div className="container">
        {animangas.length > 0 ? (
          <h2 className="text-center">ANIMANGA</h2>
        ) : null}
        <div className="row">
          {animangas.map(animang => {
            return (
              <div className="col-md-6 shadow mb-5" key={animang._id}>
                <div className="text-center">
                  <div className="btn-group">
                    <button
                      className="btn btn-danger"
                      onClick={() => remove(animang._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => update(animang._id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
                <AnimangaModal
                  selected={selected}
                  handleCloseModal={handleCloseModal}
                  id={updateId}
                />
                <h5 className="text-center text-white mt-3">
                  Type : {animang.typeofMaterial}
                </h5>
                <Link to={`/animes/${animang.mal_id}`}>
                  <img
                    src={animang.image}
                    alt={animang.title}
                    style={{ maxWidth: "100%", maxHeight: "auto" }}
                    className="img-fluid"
                  />
                </Link>
                <div className="text-center text-white mt-5">
                  <Link className="text-white" to={`animes/${animang.mal_id}`}>
                    <h4>{animang.title}</h4>
                  </Link>
                  <p className="text-justify">
                    {animang.synopsis.slice(0, 355)} <strong>...</strong>
                  </p>
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
                          {animang.addedAt.slice(0, 10)}
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

AnimangaDash.propTypes = {
  profile: PropTypes.object.isRequired,
  removeAnimanga: PropTypes.func.isRequired
};

export default connect(null, { removeAnimanga })(AnimangaDash);
