var rootPath; // Define a global variable to hold the root path of the API.

function init() {
  rootPath = "https://mysite.itvarsity.org/api/mini-blog/"; // Set the root path of the API.

  // Add event listeners to the navigation links.
  document.getElementById("getAll").addEventListener("click", getAllPosts);
  document
    .getElementById("getLatest")
    .addEventListener("click", getLatestPosts);
  document
    .getElementById("getPopular")
    .addEventListener("click", getPopularPosts);

  getAllPosts(); // Fetch all posts initially when the page loads.
}

function getAllPosts() {
  const category = "getAll"; // Define the category for fetching all posts.
  fetchPosts(category); // Call the function to fetch posts based on the category.
  setActiveLink(category); // Set the active link in the navigation.
}

function getLatestPosts() {
  const category = "getLatest"; // Define the category for fetching latest posts.
  fetchPosts(category); // Call the function to fetch posts based on the category.
  setActiveLink(category); // Set the active link in the navigation.
}

function getPopularPosts() {
  const category = "getPopular"; // Define the category for fetching popular posts.
  fetchPosts(category); // Call the function to fetch posts based on the category.
  setActiveLink(category); // Set the active link in the navigation.
}

function fetchPosts(category) {
  fetch(rootPath + "get-posts/?category=" + category) // Fetch posts from the API based on the category.
    .then(function (response) {
      return response.json(); // Parse the response as JSON.
    })
    .then(function (data) {
      displayPosts(data); // Call the function to display posts with the fetched data.
    });
}

function displayPosts(data) {
  let output = ""; // Initialize an empty string to store HTML output.

  for (i = 0; i < data.length; i++) {
    // Loop through the fetched data to create HTML for each post.
    output += `
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 fw-normal">${data[i][0]}</h4> <!-- Display post title -->
        </div>
        <div class="card-body">
          <img src="${rootPath}/uploads/${data[i][3]}" class="img-fluid card-img-top" alt="" /> <!-- Display post image -->
          <p class="card-text lead">${data[i][1]}</p> <!-- Display post content -->
          <div class="d-flex justify-content-between align-items-center my-3">
            <div class="btn-group">
              <button type="button" class="btn btn-lg btn-link">
                <i class="far fa-heart"></i> <!-- Heart icon -->
              </button>
              <button type="button" class="btn btn-lg btn-link">
                <i class="far fa-comment"></i> <!-- Comment icon -->
              </button>
              <button type="button" class="btn btn-lg btn-link">
                <i class="fa fa-retweet"></i> <!-- Retweet icon -->
              </button>
            </div>
            <div class="date">
              <small class="text-muted">${data[i][2]}</small> <!-- Display post date -->
            </div>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById("posts").innerHTML = output; // Display the generated HTML content in the posts container.
}

function setActiveLink(id) {
  // Set the active navigation link based on the provided ID.
  document.getElementById("getAll").classList.remove("active");
  document.getElementById("getPopular").classList.remove("active");
  document.getElementById("getLatest").classList.remove("active");

  document.getElementById(id).classList.add("active");
}
