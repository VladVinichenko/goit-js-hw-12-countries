import refs from '../refs/refs.js';
import country_card from '../../handlebars/country.hbs';
import countries_list from '../../handlebars/countries-list.hbs';
import FetchService from '../fetch/fetchCountries.js';
import _ from 'lodash';

import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';
defaults.styling = 'material';
defaults.delay = 1000;
const fetchService = new FetchService();

refs.input.addEventListener('input', _.debounce(searchCountry, 500));

function countryMarkUp(e) {
  refs.countries.innerHTML = country_card(e);
}

function countriesListMarkUp(e) {
  refs.countries.innerHTML = countries_list(e);
}

function searchCountry(e) {
  fetchService.query = e.target.value;
  fetchCountries();
}

function fetchCountries() {
  fetchService.fetchName().then(searchCoundriesMarkUp);
}

function searchCoundriesMarkUp(e) {
  if (e.length === 1) {
    refs.countriesList.removeEventListener('click', clickCountriesList);
    return countryMarkUp(e);
  } else if (e.length > 1 && e.length < 11) {
    countriesListMarkUp(e);
    refs.countriesList.addEventListener('click', clickCountriesList);
    return;
  } else if (e.length > 10) {
    const myNotice = new notice({
      title: 'Too many matches found.',
      text: ' Please enter a mare specific query!',
    });
  }
  const myError = new error({
    title: 'Not found.',
    text: ' Please enter normal query!',
  });
}

function clickCountriesList(evt) {
  refs.input.value = evt.target.textContent;
  fetchService.query = refs.input.value;
  fetchCountries();
}
