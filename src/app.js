document.addEventListener('DOMContentLoaded', () => {
  // Get the search button, breed search input, and breeds container elements
  const searchBtn = document.querySelector('#search-btn');
  const breedSearch = document.querySelector('#breed-search');
  const breedsContainer = document.querySelector('#breeds-container');

  // Add a click event listener to the search button
  searchBtn.addEventListener('click', () => {
    // Get the search query from the breed search input and convert it to lowercase
    const breedName = breedSearch.value.toLowerCase();

    // Fetch the breeds data from the db.json file
    fetch('src/db.json')
      .then(response => response.json())
      .then(data => {
        // Filter the breeds based on the search query
        const matchingBreeds = data.breeds.filter(breed => breed.name.toLowerCase().includes(breedName));

        // Display the matching breeds
        displayBreeds(matchingBreeds);

        // Scroll to the search results
        breedsContainer.scrollIntoView({ behavior: 'smooth' });
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });
  });

  // Function to display the breeds
  function displayBreeds(breeds) {
    // Clear the breeds container
    breedsContainer.innerHTML = '';

    // If no matching breeds were found, display a message
    if (breeds.length === 0) {
      breedsContainer.innerHTML = '<p>No matching breeds found.</p>';
      return;
    }

    // Loop through the breeds and display each one
    breeds.forEach(breed => {
      // Create a new card element for the breed
      const breedElement = document.createElement('div');
      breedElement.classList.add('card', 'mb-3');

      // Create an image element for the breed's image
      const breedImage = document.createElement('img');
      breedImage.classList.add('card-img-top');
      breedImage.src = breed.image.url;
      breedImage.alt = breed.name;

      // Create a body element for the breed card
      const breedBody = document.createElement('div');
      breedBody.classList.add('card-body');

      // Create the breed name element
      const breedNameElement = document.createElement('h5');
      breedNameElement.classList.add('card-title');
      breedNameElement.textContent = breed.name;

      // Create the breed group element
      const breedGroupElement = document.createElement('p');
      breedGroupElement.classList.add('card-text');
      breedGroupElement.textContent = `Breed Group: ${breed.breed_group}`;

      // Create the breed description element
      const breedDescriptionElement = document.createElement('p');
      breedDescriptionElement.classList.add('card-text');
      breedDescriptionElement.textContent = breed.description;

      // Append the breed name, group, and description to the breed body element
      breedBody.appendChild(breedNameElement);
      breedBody.appendChild(breedGroupElement);
      breedBody.appendChild(breedDescriptionElement);

      // Append the breed image and body to the breed element
      breedElement.appendChild(breedImage);
      breedElement.appendChild(breedBody);

      // Append the breed element to the breeds container
      breedsContainer.appendChild(breedElement);
    });
  }
});