import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ toggleModal, modalImg, modalAlt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      handleClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  const handleClose = () => {
    toggleModal({
      isOpen: false,
      src: '',
      alt: '',
    });
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={modalImg} alt={modalAlt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
};
