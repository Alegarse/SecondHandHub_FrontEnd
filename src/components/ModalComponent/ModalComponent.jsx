import React from 'react';
import './../../css/Modal.css'

const ModalComponent = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="modal-content"
        onClick={handleClickInside}
      >
        <h3 className="modal-message">{message}</h3>
        <div className="modal-buttons">
          <button
            className="btn-cancel-modal"
            onClick={onConfirm}
          >
            Aceptar
          </button>
          <button
            className="btn-confirm-modal"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
