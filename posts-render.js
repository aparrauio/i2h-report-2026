(function () {
  const posts = window.I2H_POSTS || [];
  const grid = document.querySelector('[data-posts-grid]');
  const count = document.querySelector('[data-post-count]');

  if (count) count.textContent = String(posts.length);
  if (!grid) return;

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const truncateWords = (text, maxWords = 30) => {
    const words = String(text).trim().split(/\s+/);
    return words.length <= maxWords ? text : `${words.slice(0, maxWords).join(' ')}…`;
  };

  grid.innerHTML = posts
    .map((post) => {
      const author = escapeHtml(post.author);
      const title = escapeHtml(post.title);
      const excerpt = escapeHtml(truncateWords(post.excerpt, 30));
      const url = escapeHtml(post.url);

      return `
        <article class="post-card">
          <a
            class="post-thumb"
            href="${url}"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir publicación de ${author} en LinkedIn"
          >
            <span class="post-thumb-label">LinkedIn post</span>
            <span class="post-thumb-title">${title}</span>
            <span class="post-thumb-author">${author}</span>
          </a>
          <div class="post-body">
            <p class="post-author">${author}</p>
            <h2 class="post-title">${title}</h2>
            <p class="post-excerpt">${excerpt}</p>
            <a class="post-link" href="${url}" target="_blank" rel="noreferrer">Ver publicación</a>
          </div>
        </article>
      `;
    })
    .join('');
})();
