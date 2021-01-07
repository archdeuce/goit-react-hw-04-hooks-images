import axios from 'axios';

const Config = {
  KEY: '19294514-cad9d9492229c8304ad27e22b',
  PER_PAGE: 10,
};

function fetchImage(searchQuery, page = 1) {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${Config.KEY}&image_type=photo&orientation=horizontal&per_page=${Config.PER_PAGE}`,
    )
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }

      return Promise.reject(new Error(`Images are not found.`));
    });
}

const api = {
  fetchImage,
};

export default api;
