# Teacher Dashboard - Firebase Configuration Manager

This is the teacher dashboard for managing Supabase configurations stored in Firestore.

## Features
- Google Sign-In authentication
- Create/Edit/Delete Supabase configurations
- Generate unique UUIDs for student access
- Configure access types (no-pin, fixed-pin, OTP)
- Set expiry dates for configurations

## Quick Start

### 1. Configure Firebase Project

The dashboard loads Firebase credentials from `public/firebase-credentials.json`. To switch Firebase projects:

1. Copy the example file:
   ```bash
   cp public/firebase-credentials.example.json public/firebase-credentials.json
   ```

2. Get your Firebase credentials:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings (⚙️ icon)
   - Scroll down to "Your apps" section
   - Copy the config object

3. Update `public/firebase-credentials.json` with your credentials:
   ```json
   {
     "apiKey": "YOUR_API_KEY",
     "authDomain": "your-project.firebaseapp.com",
     "projectId": "your-project-id",
     "storageBucket": "your-project.firebasestorage.app",
     "messagingSenderId": "123456789",
     "appId": "1:123456789:web:abcdef"
   }
   ```

### 2. Deploy Firestore Rules

Deploy the security rules to allow authenticated users to manage configs:

```bash
firebase deploy --only firestore:rules
```

Or manually copy rules from `firestore.rules` to Firebase Console → Firestore → Rules.

### 3. Create Firestore Index

Create a composite index for efficient queries:

```bash
firebase deploy --only firestore:indexes
```

Or manually create in Firebase Console → Firestore → Indexes:
- Collection: `configs`
- Fields: `createdBy` (Ascending), `createdAt` (Descending)

### 4. Run the Dashboard

Open `public/index.html` in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server public -p 8000
```

Then visit: `http://localhost:8000`

## Switching Between Firebase Projects

To switch to a different Firebase project, simply update `public/firebase-credentials.json` with the new project's credentials and refresh the page. No code changes needed!

## Security Notes

- `firebase-credentials.json` is gitignored to protect your credentials
- Only commit `firebase-credentials.example.json` as a template
- Firestore rules ensure only authenticated users can manage configs
- Each user can only see/edit their own configurations

## Troubleshooting

### Dashboard not loading?
- Check browser console for errors
- Verify `firebase-credentials.json` exists and has valid JSON
- Ensure Firebase project has Authentication enabled (Google Sign-In)

### Can't see any records?
- Make sure you're signed in with Google
- Deploy Firestore rules and indexes
- Check Firestore console to verify data exists

### Authentication errors?
- Enable Google Sign-In in Firebase Console → Authentication → Sign-in method
- Add your domain to authorized domains

## Related Files

- `firestore.rules` - Security rules for Firestore
- `firestore.indexes.json` - Index definitions
- `firebase.json` - Firebase project configuration
- `public/firebase-credentials.json` - Your Firebase credentials (gitignored)
- `public/firebase-credentials.example.json` - Template for credentials
