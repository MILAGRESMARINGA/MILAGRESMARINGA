// Main application file
import { setupNavigation } from './navigation.js';
import { setupValidation } from './validation.js';
import { setupStorage, syncData } from './storage.js';
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
  
  // Set up sync button functionality
  setupSyncButton();
});

function setupSyncButton() {
  const syncButton = document.getElementById('sync-button');
  
  syncButton.addEventListener('click', async () => {
    // Prevent multiple clicks while syncing
    if (syncButton.classList.contains('syncing')) return;
    
    // Add syncing state
    syncButton.classList.add('syncing');
    
    try {
      const result = await syncData();
      
      // Show result to user
      alert(result.message);
      
    } catch (error) {
      alert('Erro ao sincronizar. Tente novamente mais tarde.');
    } finally {
      // Remove syncing state
      syncButton.classList.remove('syncing');
    }
  });
}