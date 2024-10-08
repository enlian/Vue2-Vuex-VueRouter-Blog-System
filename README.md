# Vue2 + Vuex + Vue-Router Blog System

This project is a real-world blog system built from scratch using Vue2, Vuex, and Vue-Router. It covers most of the essential Vue2 skills, including routing and state management, and walks you through the process of building a complete blog system step by step.

**This project is continuously updated. If it helps you, feel free to give it a star! Thank you!**

## Technology Stack

- **Vue2**: Frontend framework for building the user interface
- **Vue-Router**: For routing and navigation
- **Vuex**: For state management
- **Webpack**: Module bundler for building and deploying the application
- **MockJS**: For mocking data and simulating backend responses
- **Bootstrap**: CSS framework for responsive design

## Features

1. **CRUD Operations**: Implement Create, Read, Update, and Delete (CRUD) operations for blog posts.
2. **Component Communication**: Learn how to manage communication between sibling components and between parent-child components (e.g., communication between a button and a data display, even if they're in different components).
3. **Vuex State Management**: State management is handled with Vuex, making it easier to share state across components.
4. **Mock Data**: The project uses MockJS to simulate data responses, enabling frontend and backend separation for development.
5. **Responsive Design**: Built with Bootstrap for a responsive and modern UI.

## Installation

To get started with this project, first install the necessary dependencies:

```bash
npm install
```

## Running the Development Environment

To start the development server with hot-reloading, run:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

## Running the Production Environment

To build the project for production, run:

```bash
npm run build
```

This will bundle the project and prepare it for deployment.

## Testing

### Unit Testing

To run the unit tests, use:

```bash
npm run unit
```

### End-to-End Testing

For end-to-end testing, use:

```bash
npm run e2e
```

### Run All Tests

To run all tests (unit and e2e), use:

```bash
npm test
```

## Project Structure

The project is structured as follows:

- `src/`: The source code for the application.
  - `components/`: Reusable Vue components.
  - `router/`: Vue-Router setup and route definitions.
  - `store/`: Vuex store configuration for state management.
  - `assets/`: Static assets like images and styles.
- `mock/`: Contains MockJS configurations for mocking API data.
- `public/`: Contains the `index.html` file that serves the app in production.
- `build/`: Webpack and environment configurations for building and deploying the app.

## Vuex State Management

This project uses Vuex to handle state management. Vuex allows us to centralize application state and makes it easier to manage complex state interactions.

Example Vuex store setup:

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post);
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    },
  },
  actions: {
    addPost({ commit }, post) {
      commit('addPost', post);
    },
    deletePost({ commit }, postId) {
      commit('deletePost', postId);
    },
  },
  getters: {
    allPosts: state => state.posts,
  }
});
```

## Mock Data with MockJS

MockJS is used to mock API responses for frontend development. You can find the mock data setup in the `mock/` directory.

Example of MockJS API setup:

```js
import Mock from 'mockjs';

Mock.mock('/api/posts', 'get', {
  'posts|5-10': [
    {
      id: '@guid',
      title: '@title',
      content: '@paragraph',
      author: '@name',
      date: '@date'
    }
  ]
});
```

## Continuous Updates

This project is continuously updated with new features and improvements. If you like the project, feel free to give it a star! Your support is appreciated!

---

Enjoy coding with Vue2, Vuex, and Vue-Router! 🚀
