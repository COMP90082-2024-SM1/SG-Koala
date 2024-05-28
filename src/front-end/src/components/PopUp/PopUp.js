import "../PopUp/PopUp.css";

const Modal = ({ show,children }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal">
        <div className="modal-content">{children}</div>
      </div>
    );
  }

export default Modal;
  