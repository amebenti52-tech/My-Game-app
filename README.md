# 🎰 My Game App - Mini Bingo

A Telegram-integrated bingo lottery game built with Next.js, Firebase, and Telegram Bot API.

## 🚀 Features

- **User Authentication** - Email/password login with Firebase Auth
- **Live Game Status** - Real-time updates from Firestore
- **Responsive Design** - Works on desktop and mobile
- **Telegram Integration** - Send messages to players
- **Admin Dashboard** - Manage withdrawals and game state
- **Fraud Detection** - AI-powered risk assessment

## 📋 Prerequisites

Before you start, make sure you have:
- Node.js 18+ installed
- A Firebase project set up
- A Telegram Bot Token
- A Vercel account

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/amebenti52-tech/My-Game-app.git
cd My-Game-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore database
5. Copy your credentials

### 4. Configure Environment Variables

Create a `.env.local` file:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Run Locally
```bash
npm run dev
```
Visit `http://localhost:3000`

### 6. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

During deployment, add your Firebase credentials as environment variables in the Vercel dashboard.

## 📁 Project Structure

```
.
├── pages/
│   ├── index.js           # Main game page
│   └── api/               # API routes
├── lib/
│   └── firebase.js        # Firebase config
├── styles/
│   └── globals.css        # Styling
├── public/                # Static files
├── package.json           # Dependencies
└── vercel.json           # Vercel config
```

## 🔐 Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /game/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /withdrawals/{id} {
      allow read: if request.auth != null;
      allow write: if false; // Only Cloud Functions
    }
  }
}
```

## 🎮 Usage

1. **Sign Up** - Create account with email/password
2. **View Game** - See live drawing status
3. **Admin Panel** - Manage withdrawals (if admin)
4. **Telegram** - Get notified of wins

## 🐛 Troubleshooting

**Issue: "Firebase is not initialized"**
- Check `.env.local` has all Firebase credentials
- Restart dev server: `npm run dev`

**Issue: "Vercel deployment failed"**
- Make sure environment variables are set in Vercel dashboard
- Check `vercel.json` configuration
- View logs: `vercel logs`

**Issue: "Game data not loading"**
- Verify Firestore database exists
- Check Firestore security rules
- Ensure user is authenticated

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## 📄 License

MIT License - feel free to use for your projects

## 🤝 Support

Need help? Check the issues section or reach out on Telegram!

---

**Happy Gaming! 🎰**