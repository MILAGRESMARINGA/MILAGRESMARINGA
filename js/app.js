// Main application file
import { setupNavigation } from './navigation.js';
import { setupValidation } from './validation.js';
import { setupStorage } from './storage.js';
import { registerServiceWorker } from './pwa.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Set up the navigation system
  setupNavigation();
  
  // Set up form validation
  setupValidation();
  
  // Set up localStorage functionality
  setupStorage();
  
  // Initialize PWA functionality
  registerServiceWorker();
});