import React from "react";
import { MdAdd } from "react-icons/md";
import { useMap } from "../../contexts/Map";

import "./style.css";

export default function AddFloatingActionButton() {
  const { loadIcons } = useMap();
  return (
    <button
      type="button"
      id="add-floating-action-button"
      data-bs-toggle="modal"
      data-bs-target="#icons-staticBackdrop"
      className="btn btn-primary rounded-circle"
      onClick={loadIcons}
    >
      <MdAdd size="1.5em" />
    </button>
  );
}
