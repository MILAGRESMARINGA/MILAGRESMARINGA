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

// Sync data with backend
export async function syncData() {
  try {
    const data = getAllData();
    
    // Don't sync if there's no data
    if (Object.values(data).every(arr => arr.length === 0)) {
      return { success: false, message: 'Nenhum dado para sincronizar' };
    }

    const response = await fetch('/api/sincronizar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Erro ao sincronizar dados');
    }

    // Clear local data after successful sync
    clearAllData();
    
    return { success: true, message: 'Dados sincronizados com sucesso!' };
  } catch (error) {
    console.error('Erro na sincronização:', error);
    return { 
      success: false, 
      message: 'Erro ao sincronizar. Tente novamente mais tarde.'
    };
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