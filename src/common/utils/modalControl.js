const openModal = (modalId) => {
  const button = document.createElement("button");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", `#${modalId}`);
  button.style.display = "none";
  document.body.appendChild(button);
  button.click();
  document.body.removeChild(button);
};

const closeModal = (modalId) => {
  const modal = document.querySelector(`#${modalId}`);
  const form = document.querySelector(`#${modalId} form`);
  const button = document.createElement("button");
  button.setAttribute("data-bs-dismiss", "modal");
  button.style.display = "none";
  modal.appendChild(button);
  button.click();
  modal.removeChild(button);
  form.classList.remove("was-validated");
};

export { openModal, closeModal };
