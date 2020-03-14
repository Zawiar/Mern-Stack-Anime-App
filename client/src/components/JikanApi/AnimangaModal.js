import React, { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAnimanga, editAnimanga } from "../../actions/profileActions";

import "./Modal.css";

Modal.setAppElement("div");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const AnimangaModal = props => {
  const [prlevel, setprlevel] = useState(undefined);
  const [watched, setwatched] = useState("false");

  const handleSubmit = () => {
    props.handleCloseModal();
    const data = {
      title: props.selected,
      image: props.image,
      synopsis: props.synopsis,
      typeofMaterial: props.typeofMaterial,
      priorityLevel: prlevel,
      mal_id: props.mal_id,
      watched
    };

    const updatedata = {
      priorityLevel: prlevel,
      watched
    };

    props.id
      ? props.editAnimanga(updatedata, props.id)
      : props.addAnimanga(data);
  };
  return (
    <div>
      <Modal
        isOpen={!!props.selected}
        onRequestClose={props.handleCloseModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <h3 className="modal__title">{props.selected}</h3>
        <img src={props.image} alt="" />
        <input
          type="Number"
          value={prlevel}
          onChange={e => setprlevel(e.target.value)}
          placeholder="Priority Level should be 1 - 10"
          className="form-control mt-3 mb-3"
        />
        <input
          type="text"
          value={watched}
          onChange={e => setwatched(e.target.value)}
          placeholder="Watched Status"
          className="form-control mt-3 mb-3"
        />
        <button className="btn btn-primary d-block" onClick={handleSubmit}>
          {props.id ? "Update" : "Add to list"}
        </button>
      </Modal>
    </div>
  );
};

AnimangaModal.propTypes = {
  addAnimanga: PropTypes.func.isRequired,
  editAnimanga: PropTypes.func.isRequired
};

export default connect(null, { addAnimanga, editAnimanga })(AnimangaModal);
