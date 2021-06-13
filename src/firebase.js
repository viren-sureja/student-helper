import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyApYAcc5f0PVEZxBWUNKcZ4DNqqqVO9twA',
    authDomain: 'quora-d3ebb.firebaseapp.com',
    projectId: 'quora-d3ebb',
    storageBucket: 'quora-d3ebb.appspot.com',
    messagingSenderId: '153712168448',
    appId: '1:153712168448:web:2178d3fb0226b1d6ab52e5',
    measurementId: 'G-V9LSBSCKW4',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export { auth, provider };
export default db;
