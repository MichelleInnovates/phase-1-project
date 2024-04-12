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