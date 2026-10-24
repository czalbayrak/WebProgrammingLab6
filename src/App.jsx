import { useEffect, useReducer, useState } from "react";
import { fetchPosts } from "./api/postsApi.js";
import { postsReducer, initialState } from "./reducer/postsReducer.js";
import PostList from "./components/PostList.jsx";
import FilterForm from "./components/FilterForm.jsx";

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState("");

  // Fetch posts once, on initial mount
  useEffect(() => {
    async function loadPosts() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPosts();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_ERROR",
          payload: err.message || "Something went wrong while loading posts.",
        });
      }
    }

    loadPosts();
  }, []);

  // Derived state: filtered posts are calculated during render, NOT stored
  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(filter.trim().toLowerCase())
  );

  let content;
  if (state.loading) {
    content = <p>Loading posts...</p>;
  } else if (state.error) {
    content = <p className="error">Error: {state.error}</p>;
  } else if (filteredPosts.length === 0) {
    content = <p>No posts found.</p>;
  } else {
    content = <PostList posts={filteredPosts} />;
  }

  return (
    <main>
      <h1>Post Dashboard</h1>
      <FilterForm filter={filter} onFilterChange={setFilter} />
      <p>
        Showing {filteredPosts.length} of {state.posts.length} posts
      </p>
      {content}
    </main>
  );
}

export default App;
