import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import firebase from 'firebase';
import { User } from '../../models/user';


@Injectable()
export class AuthData {
  constructor(
      public fireStore: AngularFirestore
  ) {
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

      const userDocument: AngularFirestoreDocument<user> = this.fireStore.doc(`users/${newUser.uid}`);
      userDocument.set({
          id: newUser.uid,
          email: email,
      });
    });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  socialLogin(provider): Promise<void> {

    switch(provider) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
    }

    // Sign in using a popup.
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    });
  }
}
