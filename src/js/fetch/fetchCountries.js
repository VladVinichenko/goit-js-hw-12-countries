const BASE_URL = 'https://restcountries.com/v2';

export default class fetchService {
  constructor() {
    this.searchQuery = '';
  }

  fetchName() {
    const url = `${BASE_URL}/name/${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(e => {
        return e;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
