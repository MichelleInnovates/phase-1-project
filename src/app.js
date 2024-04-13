document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.querySelector('#search-btn');
  const breedSearch = document.querySelector('#breed-search');
  const breedsContainer = document.querySelector('#breeds-container');

  searchBtn.addEventListener('click', () => {
    const breedName = breedSearch.value.toLowerCase();

    // Fetch the breeds data from the db.json file
    fetch('src/db.json')
      .then(response => response.json())
      .then(data => {
        // Filter the breeds based on the search query
        const matchingBreeds = data.breeds.filter(breed => breed.name.toLowerCase().includes(breedName));

        // Display the matching breeds
        displayBreeds(matchingBreeds);
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });
  });

  function displayBreeds(breeds) {
    breedsContainer.innerHTML = '';

    if (breeds.length === 0) {
      breedsContainer.innerHTML = '<p>No matching breeds found.</p>';
      return;
    }

    breeds.forEach(breed => {
      const breedElement = document.createElement('div');
      breedElement.classList.add('card', 'mb-3');

      const breedImage = document.createElement('img');
      breedImage.classList.add('card-img-top');
      breedImage.src = breed.image.url;
      breedImage.alt = breed.name;

      const breedBody = document.createElement('div');
      breedBody.classList.add('card-body');

      const breedNameElement = document.createElement('h5');
      breedNameElement.classList.add('card-title');
      breedNameElement.textContent = breed.name;

      const breedGroupElement = document.createElement('p');
      breedGroupElement.classList.add('card-text');
      breedGroupElement.textContent = `Breed Group: ${breed.breed_group}`;

      const breedDescriptionElement = document.createElement('p');
      breedDescriptionElement.classList.add('card-text');
      breedDescriptionElement.textContent = breed.description;

      breedBody.appendChild(breedNameElement);
      breedBody.appendChild(breedGroupElement);
      breedBody.appendChild(breedDescriptionElement);

      breedElement.appendChild(breedImage);
      breedElement.appendChild(breedBody);

      breedsContainer.appendChild(breedElement);
    });
  }
});