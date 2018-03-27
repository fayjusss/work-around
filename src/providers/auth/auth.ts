import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {
  constructor() {
  }

  loginUser(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      firebase
      .database()
      .ref('/userProfile')
      .child(newUser.uid)
      .set({ email: email });
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
    .auth()
    .signInWithRedirect(provider)
    .then( () => {
      firebase
      .auth()
      .getRedirectResult()
      .then( result => {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token, user);
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error.message);
      });
    });
  }
}
