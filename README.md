# POST DASHBOARD (ASSIGNMENT2)

A small React + Vite app that loads posts from JSONPlaceholder ,shows loading/error/empty states, and lets the user filter posts by title.

## How To Run
'''bash
npm install
npm run dev
'''

src/
|__api/postsApi.js -> fetchPosts(): only data fetching (no JSX no React)
|__reducer/postsReducer.js -> pure reducer for posts/loading/error
|__components/
    |__Post.jsx ->shows one post (title + body), no state
    |__PostList.jsx ->maps posts to <Post/> with  a stable key(post.id)
    |__FilterForm.jsx -> controlled input for the title filter
|__App.jsx ->owns state, runs the fetch in useEffect filters during render
|__main.jsx -> entry point
'''
-**Async state** ('posts','loading',''error') is handled with 'useReducer' and the actions 'FETCH_START','FETCH_SUCCESS','FETC_ERROR'.
-**Filter text** is a simple 'useState' in 'App'.
-**Filtered posts** are derived during render with '.filter()'; they are never stored in state.
-**Cleanup**: the effect uses an 'AbortController' and aborts the request when the component unmounts.

##Challenges I Faced
-**Folder structure:** When creating new files in VS Code, some files were created inside the wrong folder.
-**Testing the error state:** 'fetch' does not throe for 404 responses,so I check 'response.ok' and throw an error myself.I tested this by changing the API URL to a wrong one and saw the errormessage on the screen.
-**Derived state:** At first it seemed natural to keep a 'filteredPosts' state, but this would duplicate data.I calculate it during render instead.
-**Cleanup:** React StrictMode runs effects twice in development.Using 'AbortController' cancels the request, and I ignore the 'AbortError' so it is not shown to the user.