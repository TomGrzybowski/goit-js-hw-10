import Notiflix from 'notiflix';

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .then(response => {
      console.log(response);

      if (response.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return;
      }
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length > 1) {
        //if more than 1 output

        response.forEach(el => {
          const countryList = document.querySelector('.country-list');
          const li = document.createElement('li');
          li.classList.add('country-list__item');
          li.textContent = el.name;

          const flag = document.createElement('img');
          flag.src = el.flags.svg;

          li.insertAdjacentElement('afterbegin', flag);
          countryList.insertAdjacentElement('beforeend', li);
        });
      } else if (response.length === 1) {
        //if exactly 1 output
        const countryInfo = document.querySelector('.country-info');
        const languages = [];
        response[0].languages.forEach(el => {
          if (el.iso639_1) languages.push(el.name);
        });

        //create h3 tag for country name
        const h3 = document.createElement('h3');
        h3.textContent = response[0].name;

        //create img tag for country flag
        const flag = document.createElement('img');
        flag.src = response[0].flags.svg;

        //create country specific data
        const data = `
        <p><b>Capital:</b> ${response[0].capital}</p>
        <p><b>Population:</b> ${response[0].population}</p>
        <p><b>Languages:</b> ${languages.join(', ')}</p>
        `;

        //insert elements
        h3.insertAdjacentElement('afterbegin', flag);
        countryInfo.insertAdjacentElement('beforeend', h3);
        countryInfo.insertAdjacentHTML('beforeend', data);
      }

      return response;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops, something went wrong, please refresh the page and try again'
      );
    });
}
