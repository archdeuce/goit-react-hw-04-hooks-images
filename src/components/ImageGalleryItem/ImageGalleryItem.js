import PropTypes from 'prop-types';

export default function ImageGalleryItem({ src, alt, source }) {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={alt}
        data-source={source}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
};
