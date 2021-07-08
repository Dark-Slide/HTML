const astrosUrl = 'astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if(xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        return callback(data);
      } else {
        reject( Error(xhr.statusText));
      }
    };
    xhr.onerror = () => reject( Error('A network error has occurred'));
    xhr.send();
  });
};

function getProfiles(json) {
  const profiles = json.people.map( person => {
    return getJSON(wikiUrl + person.name);
  });
  return profiles;
}

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  } else {
    section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${data.title}</h2>
      <p>Results unavailable for ${data.title}</p>
      ${data.extract_html}
    `;
  }
}

btn.addEventListener('click', (event) => {
  getJSON(astrosUrl)
    .then(getProfiles)
    .then( data => console.log(data))
    .catch( err => console.log(err));
  event.target.remove();
}); 