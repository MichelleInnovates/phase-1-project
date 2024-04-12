const searchBtn = document.querySelector('#search-btn');
const resultsContainer = document.querySelector('#results-container');

searchBtn.addEventListener('click', () => {
  const breedSearch = document.querySelector('#breed-search');
  const breed = breedSearch.value;

  if (breed) {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": "live_yDuKuQv4oaHAtyvyeQALwyOZ4BwqtrglXeJXqzvCkm0k9LF5lroqFSUPij4CokrL"
    });

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const breedInfoHtml = `
            <h2>${data[0].name}</h2>
            <p>${data[0].description}</p>
            <img src="${data[0].image.url}" alt="${data[0].name}">
          `;
          resultsContainer.innerHTML = breedInfoHtml;
        } else {
          resultsContainer.innerHTML = '<p>No breed found.</p>';
        }
      })
      .catch(error => {
        console.error(error);
        resultsContainer.innerHTML = '<p>An error occurred.</p>';
      });
  }
});