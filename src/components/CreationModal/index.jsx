import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMap } from "../../contexts/Map";
import { useMemo } from "react";
import { api } from "../../services/api";
import { closeModal } from "../../common/utils/modalControl";
import { toast } from "react-toastify";

import "./style.css";

export default function CreationModal() {
  const {
    icon,
    setIcon,
    setNewMarker,
    latlng,
    setLatlng,
    defaultPlace,
    currentPlace,
    setCurrentPlace,
    loadPlaces,
  } = useMap();
  const filesInput = useRef();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const newPlace = {
        name: currentPlace.name,
        position: [latlng.lat, latlng.lng],
        icon: icon._id,
        title: currentPlace.title,
        text: currentPlace.text,
      };
      const formData = new FormData();
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
        const { data } = await api.post("/files/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data;",
          },
        });
        newPlace.images = data.ids;
      }
      await api.post("/places", newPlace);
      loadPlaces();
      closeModal("creating-staticBackdrop");
      handleCancel();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Ocorreu um erro durante o salvamento"
      );
    }
    setLoading(false);
  };
  const handleCancel = () => {
    setIcon(null);
    setNewMarker(null);
    setLatlng(null);
    setCurrentPlace(defaultPlace);
    setFiles([]);
    filesInput.current.value = "";
  };

  const imagesPreview = useMemo(
    () => (
      <div id="images-preview">
        {files.map((file) => (
          <img key={uuidv4()} alt="" src={URL.createObjectURL(file)} />
        ))}
      </div>
    ),
    [files]
  );

  useEffect(() => {
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="creating-staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="creating-staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="creating-staticBackdropLabel">
              Conte sua história
            </h1>
            {!loading && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              />
            )}
          </div>

          <div className="modal-body">
            {loading && (
              <div className="spinner-div">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <form
              id="creation-form"
              className={`needs-validation ${loading ? "hiden" : ""}`}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Nome do local*
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="nameInput"
                  value={currentPlace.name}
                  onChange={(event) =>
                    setCurrentPlace((oldState) => ({
                      ...oldState,
                      name: event.target.value,
                    }))
                  }
                />

                <div className="invalid-feedback">
                  Ops! O nome é obrigatório e deve ser único.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="filesInput" className="form-label">
                  Fotos
                </label>
                {imagesPreview}
                <input
                  className="form-control"
                  type="file"
                  id="filesInput"
                  ref={filesInput}
                  accept="image/*"
                  multiple
                  onChange={(event) => setFiles(Array.from(event.target.files))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="titleInput" className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="titleInput"
                  value={currentPlace.title}
                  onChange={(event) =>
                    setCurrentPlace((oldState) => ({
                      ...oldState,
                      title: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="storyInput" className="form-label">
                  História
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="storyInput"
                  value={currentPlace.text}
                  onChange={(event) =>
                    setCurrentPlace((oldState) => ({
                      ...oldState,
                      text: event.target.value,
                    }))
                  }
                />
              </div>
            </form>
          </div>
          {!loading && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="creation-form"
                className="btn btn-primary"
              >
                Salvar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
