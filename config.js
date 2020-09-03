import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBGkEyB2HGP3ICYdsyCwO5p0xIsswSwW5g",
  authDomain: "attendence-b191b.firebaseapp.com",
  databaseURL: "https://attendence-b191b.firebaseio.com",
  projectId: "attendence-b191b",
  storageBucket: "attendence-b191b.appspot.com",
  messagingSenderId: "543632961803",
  appId: "1:543632961803:web:532ccbafc60c57c46c320e",
  measurementId: "G-8HRBDEZS0F"
};


  firebase.initializeApp(firebaseConfig);

export default firebase.database();