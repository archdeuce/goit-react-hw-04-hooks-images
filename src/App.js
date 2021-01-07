import './App.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const toggleModal = ({ isOpen, src, alt }) => {
    setShowModal(isOpen);
    setModalImg(src);
    setModalAlt(alt);
  };

  return (
    <div className="App">
      <ToastContainer closeOnClick autoClose={2000} />

      <Searchbar onSubmit={onSubmit} />

      <ImageGallery searchQuery={searchQuery} toggleModal={toggleModal} />

      {showModal && (
        <Modal
          toggleModal={toggleModal}
          modalImg={modalImg}
          modalAlt={modalAlt}
        />
      )}
    </div>
  );
}
