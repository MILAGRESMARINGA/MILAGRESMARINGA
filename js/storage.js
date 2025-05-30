// Local storage functionality
export function setupStorage() {
  // Initialize storage if it doesn't exist
  if (!localStorage.getItem('milagres-data')) {
    initializeStorage();
  }
}

// Initialize localStorage structure
function initializeStorage() {
  const initialData = {
    'accept-jesus': [],
    'returning': [],
    'miracle-testimony': []
  };
  
  localStorage.setItem('milagres-data', JSON.stringify(initialData));
}

// Save form data to localStorage
export function saveFormData(formType, data) {
  try {
    // Get existing data
    const storageData = JSON.parse(localStorage.getItem('milagres-data')) || initializeStorage();
    
    // Add new data to the appropriate array
    if (Array.isArray(storageData[formType])) {
      storageData[formType].push(data);
    } else {
      storageData[formType] = [data];
    }
    
    // Save updated data
    localStorage.setItem('milagres-data', JSON.stringify(storageData));
    
    return true;
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
    return false;
  }
}

// Get form data from localStorage
export function getFormData(formType) {
  try {
    const storageData = JSON.parse(localStorage.getItem('milagres-data'));
    return storageData[formType] || [];
  } catch (error) {
    console.error('Error retrieving data from localStorage:', error);
    return [];
  }
}

// Get all saved data
export function getAllData() {
  try {
    return JSON.parse(localStorage.getItem('milagres-data')) || {};
  } catch (error) {
    console.error('Error retrieving all data from localStorage:', error);
    return {};
  }
}

// Clear specific form data
export function clearFormData(formType) {
  try {
    const storageData = JSON.parse(localStorage.getItem('milagres-data'));
    storageData[formType] = [];
    localStorage.setItem('milagres-data', JSON.stringify(storageData));
    return true;
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
    return false;
  }
}

// Clear all saved data
export function clearAllData() {
  try {
    localStorage.removeItem('milagres-data');
    initializeStorage();
    return true;
  } catch (error) {
    console.error('Error clearing all data from localStorage:', error);
    return false;
  }
}