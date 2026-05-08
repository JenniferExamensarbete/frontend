import "./Modal.css";

function Modal({ title, children, onClose }) {
  return (
    <section className="modal-backdrop">
      <div className="modal-card card">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" type="button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </section>
  );
}

export default Modal;