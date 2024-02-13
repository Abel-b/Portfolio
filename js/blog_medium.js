const accessToken =
  "2c29d6ea55b502167221c9a49ca1df90a96879c48942d73456be6fdb0da3fa898";
const apiUrl = `https://api.medium.com/v1/users/abel-berhane-wm/posts`;
const blogPosts = document.getElementById("blog-posts");

fetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const posts = data.data;

    posts.forEach((post) => {
      const title = post.title;
      const url = post.canonicalUrl;
      const createdAt = new Date(post.createdAt).toDateString();
      const author = post.author.name;
      const authorUrl = `https://medium.com/@${post.author.username}`;
      const image = post.virtuals.previewImage.imageId;

      const postHtml = `
      <div class="blog-post">
        <a href="${url}" target="_blank">
          <img src="https://miro.medium.com/fit/c/200/200/${image}" alt="${title}">
        </a>
        <div class="blog-post-info">
          <h3><a href="${url}" target="_blank">${title}</a></h3>
          <p class="blog-post-meta">${createdAt} by <a href="${authorUrl}" target="_blank">${author}</a></p>
        </div>
      </div>
    `;

      blogPosts.innerHTML += postHtml;
    });
  })
  .catch((error) => {
    console.error(error);
  });
