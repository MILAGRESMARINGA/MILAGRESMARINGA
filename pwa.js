// PWA functionality
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered with scope:', registration.scope);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, notify user
            showUpdateNotification();
          }
        });
      });
    } catch (error) {
      // Only log non-environment related errors
      if (!error.message?.includes('Service Workers are not yet supported on StackBlitz')) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }
}

function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <p>Nova versão disponível!</p>
    <button onclick="window.location.reload()">Atualizar agora</button>
  `;
  document.body.appendChild(notification);
}