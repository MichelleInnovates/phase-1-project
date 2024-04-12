const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_yDuKuQv4oaHAtyvyeQALwyOZ4BwqtrglXeJXqzvCkm0k9LF5lroqFSUPij4CokrL"
  });
  
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  
  fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    const breedSearch = document.querySelector('#breed-search');
const breedInfo = document.querySelector('#breed-info');

breedSearch.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const breed = event.target.value;
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const breedInfoHtml = `
            <h2>${data[0].name}</h2>
            <p>${data[0].description}</p>
            <img src="${data[0].image.url}" alt="${data[0].name}">
          `;
          breedInfo.innerHTML = breedInfoHtml;
        } else {
          breedInfo.innerHTML = '<p>No breed found.</p>';
        }
      })
      .catch(error => {
        console.error(error);
        breedInfo.innerHTML = '<p>An error occurred.</p>';
      });
  }
});