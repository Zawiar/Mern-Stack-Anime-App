import React, { useEffect, useState } from "react";
import JikanJs from "jikanjs";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addAnimanga } from "../../actions/profileActions";
import AnimangaModal from "./AnimangaModal";

import PropTypes from "prop-types";
const SingleAnime = props => {
  const [Anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setupdate] = useState(false);
  const [prlevel, setprlevel] = useState(undefined);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    JikanJs.loadAnime(props.match.params.id)
      .then(anime => {
        setAnime(anime);
        console.log(anime);
        setLoading(false);
        setupdate(false);
      })
      .catch(err => console.log(err));
  }, [update]);

  const handleUpdate = () => {
    setupdate(true);
  };

  const addanimanga = () => {
    setSelected(Anime.title);
  };

  const handleCloseModal = () => {
    setSelected(undefined);
  };

  let AddButton;
  let found = props.profile.animanga
    .map(item => item.mal_id)
    .indexOf(Anime.mal_id);

  if (props.auth.user.name) {
    AddButton =
      found > -1 ? (
        "Already in Animanga List"
      ) : (
        <button className="btn btn-success" onClick={addanimanga}>
          Add Animanga to List
        </button>
      );
  }
  return (
    <div>
      <div className="container">
        {loading ? (
          <div className="text-center mt-5 mb-5">
            <Spinner />
          </div>
        ) : (
          <div>
            <Link className="btn btn-secondary mt-3 mb-3" to="/animes">
              Go Back
            </Link>
            <div className="row">
              <div className="col-xl-3 col-md-4 mb-3 mt-3 m-auto text-center">
                {props.auth.user.name && (
                  <AnimangaModal
                    selected={selected}
                    handleCloseModal={handleCloseModal}
                    image={Anime.image_url}
                    synopsis={Anime.synopsis}
                    typeofMaterial="Anime"
                    mal_id={Anime.mal_id}
                  />
                )}
                <h4>{Anime.title}</h4>
                <p className="badge d-block badge-success">
                  Score {Anime.score}
                </p>
                <img src={Anime.image_url} alt="" />
                <div style={{ lineHeight: "15px" }}>
                  <p className="mt-3" style={{ fontSize: "13px" }}>
                    Japanese Title : {Anime.title_japanese}
                  </p>
                  <p className="mt-3 text-left" style={{ fontSize: "13px" }}>
                    English Title :{" "}
                    {Anime.title_english ? Anime.title_english : null}
                  </p>
                </div>
              </div>
              <div className="col-xl-9 col-md-8 mb-3 mt-3 ">
                {AddButton}
                <h5 className="mt-5">Synopsis :</h5>
                <p className="text-justify">{Anime.synopsis}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 bg-secondary text-white mt-2 mb-2">
                <h4 className="mb-3 mt-3">Information:</h4>
                <p style={{ fontSize: "13px" }}>
                  Aired from : {Anime.aired.from.slice(0, 10)} -{" "}
                  {Anime.aired.to ? Anime.aired.to.slice(0, 10) : "?"}
                </p>
                <p style={{ fontSize: "13px" }}>Status : {Anime.status}</p>
                <p style={{ fontSize: "13px" }}>Rating : {Anime.rating}</p>
                <p style={{ fontSize: "13px" }}>Duration : {Anime.duration}</p>
                <p style={{ fontSize: "13px" }}>Episodes : {Anime.episodes}</p>
              </div>
              <div className="col-md-9 bg-success text-white mt-2 mb-2">
                <h3>Related</h3>
                {Anime.related.Adaptation ? (
                  <div className="mt-2">
                    <h6>Adaptation</h6>
                    {Anime.related.Adaptation.map(item => {
                      return (
                        <div key={item.mal_id}>
                          <p style={{ fontSize: "13px" }}>
                            Type : {item.type} &nbsp; &nbsp; Title: {item.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {Anime.related.Prequel ? (
                  <div className="mt-2">
                    <h6>Prequel</h6>
                    {Anime.related.Prequel.map(item => {
                      return (
                        <div key={item.mal_id}>
                          <Link
                            to={`/animes/${item.mal_id}`}
                            onClick={handleUpdate}
                            className="btn btn-primary"
                          >
                            {item.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {Anime.related.Sequel ? (
                  <div className="mt-2">
                    <h6>Sequel</h6>
                    {Anime.related.Sequel.map(item => {
                      return (
                        <div key={item.mal_id}>
                          <Link
                            onClick={handleUpdate}
                            to={`/animes/${item.mal_id}`}
                            className="btn btn-primary"
                          >
                            {item.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <h4 className="mb-3 mt-2">Themes</h4>
                {Anime.opening_themes.length > 0 && (
                  <div>
                    <h6>OPENING THEMES</h6>
                    {Anime.opening_themes.map((theme, index) => {
                      return (
                        <p key={index} style={{ fontSize: "13px" }}>
                          Opening : {theme}
                        </p>
                      );
                    })}
                  </div>
                )}
                {Anime.ending_themes.length > 0 && (
                  <div>
                    <h6>ENDING THEMES</h6>
                    {Anime.ending_themes.map((theme, index) => {
                      return (
                        <p key={index} style={{ fontSize: "13px" }}>
                          Ending : {theme}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SingleAnime.propTypes = {
  addAnimanga: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { addAnimanga })(SingleAnime);
