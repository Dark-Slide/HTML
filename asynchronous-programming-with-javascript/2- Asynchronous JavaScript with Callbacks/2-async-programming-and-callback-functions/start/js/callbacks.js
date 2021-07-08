const astrosUrl = 'astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request // Entire section done by fetch at line 58
// function getJSON(url) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.onload = () => {
//       if(xhr.status === 200) {
//         let data = JSON.parse(xhr.responseText);
//         resolve(data);
//       } else {
//         reject( Error(xhr.statusText));
//       }
//     };
//     xhr.onerror = () => reject( Error('A network error has occurred'));
//     xhr.send();
//   });
// };

function getProfiles(json) {
  const profiles = json.people.map( person => {
    return fetch(wikiUrl + person.name)
      .then(  response => response.json());
      .catch( err => console.log('Error Fetching Wiki: ',err))
  });
  return Promise.all(profiles); // Promise.all will fail, if a single promise fails.
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map( person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    // Check if request returns a 'standard' page from Wiki
    if (data.type === 'standard') {
      section.innerHTML = `
        <img src=${person.thumbnail.source}>
        <h2>${person.title}</h2>
        <p>${person.description}</p>
        <p>${person.extract}</p>
      `;
    } else {
      section.innerHTML = `
        <img src="img/profile.jpg" alt="ocean clouds seen from space">
        <h2>${data.title}</h2>
        <p>Results unavailable for ${data.title}</p>
        ${data.extract_html}
      `;
    }
  });

}

btn.addEventListener('click', (event) => {
  event.target.textContent = "Loading...";
  fetch(astrosUrl)
    .then( response => response.json() )
    .then(getProfiles)
    .then(generateHTML)
    .catch( err => {
      peopleList.innerHTML = '<h3>Something went wrong</h3>';
      console.log(err);
    });
    .finally( () => event.target.remove());
}); 