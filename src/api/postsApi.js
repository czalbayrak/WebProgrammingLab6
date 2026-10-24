// API layer: only data-fetching logic. No JSX, no React imports.

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal });

  // fetch does not throw on HTTP errors (404, 500...), so we check it ourselves
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}