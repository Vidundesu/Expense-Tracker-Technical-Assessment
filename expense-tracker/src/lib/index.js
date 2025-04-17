// src/index.js
import { writable } from 'svelte/store';

// Initialize dark mode from localStorage
export const darkMode = writable(
  typeof localStorage !== 'undefined' ? localStorage.getItem('darkMode') === 'true' : false
);

darkMode.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('darkMode', value);
    document.documentElement.classList.toggle('dark', value);
  }
});