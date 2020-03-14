import React, { useEffect, useState } from "react";
import Jikanjs from "jikanjs";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
const Jikan = () => {
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const searchForAnime = () => {
    setLoading(true);
    setSearch("");
    Jikanjs.search("anime", search, null)
      .then(animes => {
        setAnimes(animes.results);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    Jikanjs.loadTop("anime", 1, "airing")
      .then(anime => {
        setAnimes(anime.top);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for any Anime"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success mb-3 mt-3 ml-3"
              onClick={searchForAnime}
            >
              {" "}
              <i className="fa fa-search "></i>{" "}
              <span className="pl-2">Search Anime</span>{" "}
            </button>
          </div>
        </div>
        {/* <Link to="/search/anime" className="btn btn-secondary mt-3">
          {" "}
          <i className="fa fa-search fa-2x"></i>{" "}
          <span className="pl-2">Search Anime</span>
        </Link> */}
        {!loading && (
          <div className="row">
            {animes.map(anime => {
              return (
                <div
                  className="col-md-4 col-xl-3 col-sm-6 shadow text-center text-white mt-3 mb-3"
                  key={anime.mal_id}
                >
                  <Link className="text-white" to={`animes/${anime.mal_id}`}>
                    <h4>{anime.title}</h4>
                  </Link>

                  <Link to={`animes/${anime.mal_id}`}>
                    <img src={anime.image_url} alt={anime.title} />
                  </Link>
                  <p className="badge badge-success m-3">
                    Score: {anime.score}
                  </p>
                  {anime.start_date && (
                    <p className="badge badge-success m-3">
                      Start Date: {anime.start_date.slice(0, 10)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {loading && (
          <div className="text-center pb-5 mt-5">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Jikan;
