import { posts } from './blog';
import { categories } from './categories';

let postId = posts.length + 1;
let categoryId = categories.length + 1;

export const getPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts);
    }, 500);
  });
};

export const addPost = (post) => {
  return new Promise((resolve) => {
    post.id = postId++;
    posts.push(post);
    resolve();
  });
};

export const deletePost = (id) => {
  return new Promise((resolve) => {
    const index = posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      posts.splice(index, 1);
    }
    resolve();
  });
};

export const updatePost = (updatedPost) => {
  return new Promise((resolve) => {
    const index = posts.findIndex((post) => post.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = updatedPost;
    }
    resolve();
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 500);
  });
};

export const addCategory = (category) => {
  return new Promise((resolve) => {
    category.id = categoryId++;
    category.subCategories = [];
    categories.push(category);
    resolve();
  });
};

export const deleteCategory = (id) => {
  return new Promise((resolve) => {
    const index = categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      categories.splice(index, 1);
    }
    resolve();
  });
};

export const updateCategory = (updatedCategory) => {
  return new Promise((resolve) => {
    const index = categories.findIndex((category) => category.id === updatedCategory.id);
    if (index !== -1) {
      categories[index] = updatedCategory;
    }
    resolve();
  });
};

export const addSubCategory = (categoryId, subCategory) => {
  return new Promise((resolve) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      subCategory.id = ++categoryId;
      category.subCategories.push(subCategory);
    }
    resolve();
  });
};
