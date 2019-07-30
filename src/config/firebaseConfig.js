import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: "AIzaSyB4SlHlxRYbn1MDzu4EcyS53FtiHdEUk2k",
  authDomain: "desafio-blog.firebaseapp.com",
  databaseURL: "https://desafio-blog.firebaseio.com",
  projectId: "desafio-blog",
  storageBucket: "",
  messagingSenderId: "875569247328",
  appId: "1:875569247328:web:78261bdb350762ac"  
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}

db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
}