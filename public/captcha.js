// CAPTCHA Generator and Validator

class CaptchaManager {
    constructor() {
        this.currentCaptcha = '';
        this.generateCaptcha();
    }

    // Generate random CAPTCHA string
    generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar looking chars
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.currentCaptcha = captcha;
        return captcha;
    }

    // Display CAPTCHA
    displayCaptcha() {
        const captchaText = document.getElementById('captcha-text');
        if (captchaText) {
            captchaText.textContent = this.currentCaptcha;
        }
    }

    // Refresh CAPTCHA
    refreshCaptcha() {
        this.generateCaptcha();
        this.displayCaptcha();
        
        // Clear input
        const captchaInput = document.getElementById('captcha-input');
        if (captchaInput) {
            captchaInput.value = '';
        }
    }

    // Validate CAPTCHA
    validate(input) {
        return input.toUpperCase() === this.currentCaptcha;
    }

    // Get current CAPTCHA (for testing)
    getCurrent() {
        return this.currentCaptcha;
    }
}

// Create global instance
const captchaManager = new CaptchaManager();

// Setup refresh button
document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-captcha');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            captchaManager.refreshCaptcha();
        });
    }
});
