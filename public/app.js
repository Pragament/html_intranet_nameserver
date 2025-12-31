// Main Application Entry Point

console.log('Config Manager App Initialized');

// Display initial CAPTCHA
document.addEventListener('DOMContentLoaded', () => {
    captchaManager.displayCaptcha();
    console.log('App ready');
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
