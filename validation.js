// Form validation functionality
import { saveFormData } from './storage.js';
import { showSuccessMessage } from './navigation.js';

export function setupValidation() {
  // Get all form elements
  const acceptJesusForm = document.getElementById('accept-jesus-form');
  const returningForm = document.getElementById('returning-form');
  const miracleTestimonyForm = document.getElementById('miracle-testimony-form');
  
  // Set up validation and submission for "Eu Aceito Jesus" form
  if (acceptJesusForm) {
    acceptJesusForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const nameInput = document.getElementById('accept-name');
      const phoneInput = document.getElementById('accept-phone');
      const cityInput = document.getElementById('accept-city');
      const countryCode = document.getElementById('accept-country-code').value;
      
      // Validate inputs
      if (validateForm('accept', nameInput, phoneInput, cityInput)) {
        // Save data if validation passes
        saveFormData('accept-jesus', {
          name: nameInput.value,
          phone: `${countryCode} ${phoneInput.value}`,
          city: cityInput.value,
          date: new Date().toISOString()
        });
        
        // Clear form
        acceptJesusForm.reset();
        
        // Show success message
        showSuccessMessage();
      }
    });
  }
  
  // Set up validation and submission for "Estou Voltando" form
  if (returningForm) {
    returningForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const nameInput = document.getElementById('return-name');
      const phoneInput = document.getElementById('return-phone');
      const cityInput = document.getElementById('return-city');
      const countryCode = document.getElementById('return-country-code').value;
      
      // Validate inputs
      if (validateForm('return', nameInput, phoneInput, cityInput)) {
        // Save data if validation passes
        saveFormData('returning', {
          name: nameInput.value,
          phone: `${countryCode} ${phoneInput.value}`,
          city: cityInput.value,
          date: new Date().toISOString()
        });
        
        // Clear form
        returningForm.reset();
        
        // Show success message
        showSuccessMessage();
      }
    });
  }
  
  // Set up validation and submission for "Recebi meu Milagre" form
  if (miracleTestimonyForm) {
    miracleTestimonyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const miracleTypeInput = document.getElementById('miracle-type');
      const miracleDetailsInput = document.getElementById('miracle-details');
      const nameInput = document.getElementById('miracle-name');
      const phoneInput = document.getElementById('miracle-phone');
      const cityInput = document.getElementById('miracle-city');
      const countryCode = document.getElementById('miracle-country-code').value;
      
      // Validate inputs
      if (validateMiracleForm(nameInput, phoneInput, cityInput, miracleTypeInput, miracleDetailsInput)) {
        // Save data if validation passes
        saveFormData('miracle-testimony', {
          name: nameInput.value,
          phone: `${countryCode} ${phoneInput.value}`,
          city: cityInput.value,
          type: miracleTypeInput.value,
          details: miracleDetailsInput.value,
          date: new Date().toISOString()
        });
        
        // Clear form
        miracleTestimonyForm.reset();
        
        // Show success message
        showSuccessMessage();
      }
    });
  }
}

// Validation function for name, phone, and city
function validateForm(prefix, nameInput, phoneInput, cityInput) {
  let isValid = true;
  
  // Validate name (only letters and spaces)
  if (!validateName(nameInput.value)) {
    showError(`${prefix}-name-error`, 'Nome deve conter apenas letras e espaços');
    markInvalid(nameInput);
    isValid = false;
  } else {
    clearError(`${prefix}-name-error`);
    markValid(nameInput);
  }
  
  // Validate phone (international format, 10-13 digits)
  if (!validatePhone(phoneInput.value)) {
    showError(`${prefix}-phone-error`, 'Telefone deve conter 10 a 13 dígitos');
    markInvalid(phoneInput);
    isValid = false;
  } else {
    clearError(`${prefix}-phone-error`);
    markValid(phoneInput);
  }
  
  // Validate city (only letters and spaces)
  if (!validateCity(cityInput.value)) {
    showError(`${prefix}-city-error`, 'Cidade deve conter apenas letras e espaços');
    markInvalid(cityInput);
    isValid = false;
  } else {
    clearError(`${prefix}-city-error`);
    markValid(cityInput);
  }
  
  return isValid;
}

// Validation function for miracle testimony
function validateMiracleForm(nameInput, phoneInput, cityInput, typeInput, detailsInput) {
  let isValid = true;
  
  // Validate name, phone, and city
  if (!validateName(nameInput.value)) {
    showError('miracle-name-error', 'Nome deve conter apenas letras e espaços');
    markInvalid(nameInput);
    isValid = false;
  } else {
    clearError('miracle-name-error');
    markValid(nameInput);
  }
  
  if (!validatePhone(phoneInput.value)) {
    showError('miracle-phone-error', 'Telefone deve conter 10 a 13 dígitos');
    markInvalid(phoneInput);
    isValid = false;
  } else {
    clearError('miracle-phone-error');
    markValid(phoneInput);
  }
  
  if (!validateCity(cityInput.value)) {
    showError('miracle-city-error', 'Cidade deve conter apenas letras e espaços');
    markInvalid(cityInput);
    isValid = false;
  } else {
    clearError('miracle-city-error');
    markValid(cityInput);
  }
  
  // Validate type (must be selected)
  if (typeInput.value === "") {
    markInvalid(typeInput);
    isValid = false;
  } else {
    markValid(typeInput);
  }
  
  // Validate details (must not be empty)
  if (detailsInput.value.trim() === "") {
    markInvalid(detailsInput);
    isValid = false;
  } else {
    markValid(detailsInput);
  }
  
  return isValid;
}

// Validation helpers
function validateName(name) {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return nameRegex.test(name) && name.trim().length > 0;
}

function validatePhone(phone) {
  // Remove any non-digit characters for validation
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

function validateCity(city) {
  const cityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  return cityRegex.test(city) && city.trim().length > 0;
}

// UI feedback helpers
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function markInvalid(inputElement) {
  inputElement.classList.add('error');
  inputElement.classList.remove('valid');
  inputElement.classList.add('shake');
  
  // Remove shake animation after it completes
  setTimeout(() => {
    inputElement.classList.remove('shake');
  }, 600);
}

function markValid(inputElement) {
  inputElement.classList.remove('error');
  inputElement.classList.add('valid');
}