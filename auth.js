// Authentication Manager

class AuthManager {
    constructor() {
        this.currentUser = null;
        // Wait for Firebase to be ready before initializing
        if (typeof auth !== 'undefined') {
            this.init();
        } else {
            window.addEventListener('firebase-ready', () => {
                this.init();
            });
        }
    }

    init() {
        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            this.updateUI();
        });
    }

    // Sign in with Google
    async signInWithGoogle() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            this.currentUser = result.user;
            console.log('User signed in:', this.currentUser.email);
            return result.user;
        } catch (error) {
            console.error('Sign in error:', error);
            
            // Don't show alert for user-cancelled actions
            if (error.code !== 'auth/popup-closed-by-user' && 
                error.code !== 'auth/cancelled-popup-request') {
                alert('Failed to sign in: ' + error.message);
            }
            throw error;
        }
    }

    // Sign out
    async signOut() {
        try {
            await auth.signOut();
            this.currentUser = null;
            console.log('User signed out');
        } catch (error) {
            console.error('Sign out error:', error);
            alert('Failed to sign out: ' + error.message);
        }
    }

    // Update UI based on auth state
    updateUI() {
        const loginScreen = document.getElementById('login-screen');
        const dashboardScreen = document.getElementById('dashboard-screen');
        const userName = document.getElementById('user-name');

        if (this.currentUser) {
            // User is signed in
            loginScreen.classList.add('hidden');
            dashboardScreen.classList.remove('hidden');
            
            if (userName) userName.textContent = this.currentUser.displayName || this.currentUser.email;
            
            // Load records
            if (window.recordsManager) {
                window.recordsManager.loadRecords();
            }
        } else {
            // User is signed out
            loginScreen.classList.remove('hidden');
            dashboardScreen.classList.add('hidden');
        }
    }

    // Get current user ID
    getUserId() {
        return this.currentUser ? this.currentUser.uid : null;
    }

    // Get current user email
    getUserEmail() {
        return this.currentUser ? this.currentUser.email : null;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// Create global instance
const authManager = new AuthManager();

// Setup event listeners
document.addEventListener('DOMContentLoaded', () => {
    const googleLoginBtn = document.getElementById('google-login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            authManager.signInWithGoogle();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                authManager.signOut();
            }
        });
    }
});
