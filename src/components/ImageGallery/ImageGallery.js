import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import pixabayAPI from '../../services/pixabay-api';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import Loader from '../Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ searchQuery, toggleModal }) {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setPage(1);
    setStatus(Status.PENDING);
    handleRequest(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    setStatus(Status.PENDING);
    handleRequest(searchQuery, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleRequest = (searchQuery, nextPage = 1) => {
    pixabayAPI
      .fetchImage(searchQuery, nextPage)
      .then(({ hits, totalHits }) => {
        if (nextPage > 1) {
          setImages(state => [...state, ...hits]);
        } else {
          setImages(hits);
        }

        setTotalHits(totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      })
      .finally(() => {
        setStatus(Status.IDLE);
        pageSmoothScroll();
      });
  };

  const handleLoadMoreBtn = () => {
    setPage(state => state + 1);
  };

  const handleModal = e => {
    if (e.target !== e.currentTarget) {
      toggleModal({
        isOpen: true,
        src: e.target.dataset.source,
        alt: e.target.alt,
      });
    }
  };

  const pageSmoothScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const showError = error => {
    toast.error(error.message, { toastId: 'error' });
  };

  const showInfo = () => {
    toast.info('Images are not found.', { toastId: 'resolved' });
  };

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    showError(error);
  }

  if (status === Status.RESOLVED || status === Status.IDLE) {
    if (!images.length && status !== Status.IDLE) {
      showInfo();
      return null;
    }

    return (
      <>
        <ul className="ImageGallery" onClick={handleModal}>
          {images.map(({ tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={shortid.generate()}
              src={webformatURL}
              alt={tags}
              source={largeImageURL}
            />
          ))}
        </ul>

        {images.length < totalHits && (
          <LoadMoreButton onClick={handleLoadMoreBtn} />
        )}
      </>
    );
  }

  return null;
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
