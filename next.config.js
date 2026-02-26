const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  react: {
    fastRefresh: true,
  },
  images: {
    domains: ['livetv-c2912.firebaseapp.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyAmPQ5fK9PPn_Wv-rIFFUfYiDA1vSXILTY',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'livetv-c2912.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'livetv-c2912',
  },
});
