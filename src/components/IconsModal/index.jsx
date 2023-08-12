import React from "react";
import { v4 as uuidv4 } from "uuid";
import { baseURL } from "../../services/api";
import { useMap } from "../../contexts/Map";

export default function IconsModal() {
  const { setIcon, icons } = useMap();

  return (
    <div
      className="modal fade"
      id="icons-staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="icons-staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="icons-staticBackdropLabel">
              Escolha um Ícone
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div id="iconsDiv">
              {icons.map((icon) => (
                <button
                  key={uuidv4()}
                  data-bs-dismiss="modal"
                  onClick={() => setIcon(icon)}
                >
                  <img alt="" src={`${baseURL}/files/icons/id/${icon.file}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
