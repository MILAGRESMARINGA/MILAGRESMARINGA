// Navigation functionality
export function setupNavigation() {
  // Get all choice buttons from home screen
  const choiceButtons = document.querySelectorAll('.choice-button');
  
  // Get all back buttons from form screens
  const backButtons = document.querySelectorAll('.back-button');
  
  // Get back to home button from success screen
  const backToHomeButton = document.querySelector('.back-to-home-button');
  
  // Set up choice buttons to navigate to appropriate form
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetFormId = button.getAttribute('data-form');
      navigateToScreen(targetFormId);
    });
  });
  
  // Set up back buttons to return to home screen
  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      navigateToScreen('home-screen');
    });
  });
  
  // Set up back to home button
  if (backToHomeButton) {
    backToHomeButton.addEventListener('click', () => {
      navigateToScreen('home-screen');
    });
  }
}

// Navigate to a specific screen
export function navigateToScreen(screenId) {
  // Hide all screens
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show the target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    // Small delay for smoother transition
    setTimeout(() => {
      targetScreen.classList.add('active');
    }, 50);
  }
}

// Function to show success message and navigate to success screen
export function showSuccessMessage() {
  navigateToScreen('success-screen');
  
  // Automatically return to home screen after 3 seconds
  setTimeout(() => {
    navigateToScreen('home-screen');
  }, 3000);
}