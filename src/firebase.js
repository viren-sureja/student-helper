import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
    apiKey: 'AIzaSyApYAcc5f0PVEZxBWUNKcZ4DNqqqVO9twA',
    authDomain: 'quora-d3ebb.firebaseapp.com',
    projectId: 'quora-d3ebb',
    storageBucket: 'quora-d3ebb.appspot.com',
    messagingSenderId: '153712168448',
    appId: '1:153712168448:web:2178d3fb0226b1d6ab52e5',
    measurementId: 'G-V9LSBSCKW4',
}; */

const firebaseConfig = {
    apiKey: 'AIzaSyAou3TEV2CB4GtCvsP3JQcwIrRDVXIwUxs',
    authDomain: 'studenthelper-945a3.firebaseapp.com',
    projectId: 'studenthelper-945a3',
    storageBucket: 'studenthelper-945a3.appspot.com',
    messagingSenderId: '290774875605',
    appId: '1:290774875605:web:83652dab33301c252a915c',
    measurementId: 'G-GBESPZVWWN',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export { auth, provider };
export default db;
