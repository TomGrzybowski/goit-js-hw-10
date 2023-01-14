import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import _ from 'lodash';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handleInput(event) {
  let name = input.value.trim();
  //clear content before refreshing
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (name === '') {
    countryList.classList.add('is-hidden');
    return;
  }

  fetchCountries(name);
}

input.addEventListener('input', _.debounce(handleInput, DEBOUNCE_DELAY));
