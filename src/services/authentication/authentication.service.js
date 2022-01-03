import firebase from 'firebase/compat/app';

export const loginRequest = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}