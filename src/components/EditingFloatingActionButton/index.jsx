import React from "react";
import { MdCheck, MdClear } from "react-icons/md";
import { useMap } from "../../contexts/Map";
import { openModal } from "../../common/utils/modalControl";

import "./style.css";

export default function EditingFloatingActionButton() {
  const { setIcon, setNewMarker, latlng, setLatlng } = useMap();
  const handleSubmit = () => {
    openModal("creating-staticBackdrop");
  };
  const handleCancel = () => {
    setIcon(null);
    setNewMarker(null);
    setLatlng(null);
  };
  return (
    <div id="editting-buttons">
      <button
        type="button"
        id="clear-floating-action-button"
        className="btn btn-secondary rounded-circle"
        onClick={handleCancel}
      >
        <MdClear size="1.5em" />
      </button>
      <button
        disabled={!latlng}
        type="button"
        id="check-floating-action-button"
        className="btn btn-primary rounded-circle"
        onClick={handleSubmit}
      >
        <MdCheck size="1.5em" />
      </button>
    </div>
  );
}
