// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import { signOut } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'JJA_DK145364mkas45.gflh',
  authDomain: 'react-project-3a85c.firebaseapp.com',
  projectId: 'react-project-3a85c',
  storageBucket: 'react-project-3a85c.appspot.com',
  messagingSenderId: '929944932817',
  appId: '1:929944932817:web:27c526ba761b8036e110f0',
  measurementId: 'G-5NHHD7VGGS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const Googlelogout = async () => {
  swal({
    icon: 'warning',
    title: '確定要登出嗎',
    buttons: {
      cancel: {
        text: '取消',
        value: false,
        visible: true,
      },
      confirm: {
        text: '確認',
        value: true,
        visible: true,
      },
    },
  }).then((logout) => {
    if (logout) {
      const auth = getAuth()
      return signOut(auth)
        .then(() => {
          auth.currentUser = null
          window.location.href = '/loginPage'
          console.log('User signed out')
          return true
        })
        .catch((error) => {
          console.error('Sign out error:', error)
          return false
        })
    } else {
    }
  })
}

export const auth = getAuth(app)

export const provide = new GoogleAuthProvider()

export const fbAuthProvider = new FacebookAuthProvider()

export const FacebookAuth = async () => {
  const fbAuth = signInWithPopup(auth, fbAuthProvider)
  return fbAuth
}
