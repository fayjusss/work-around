import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { User } from '../../models/user';


@Injectable()
export class AuthData {
  userId: string;
  constructor(
      public fireStore: AngularFirestore,
      public afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  loginUser(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      const userDocument: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${newUser.uid}`);
      userDocument.set({
          id: newUser.uid,
          email: email,
          name: null,
          age: null,
          location: null
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
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
      // This gives you a Facebook Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var newUser = result.user;

      // If user is new then create a new profiel entry
      if (result.additionalUserInfo.isNewUser) {
        const newSocialUserDocument: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${newUser.uid}`);
        newSocialUserDocument.set({
          id: newUser.uid,
          email: newUser.email,
          name: newUser.displayName,
          age: null,
          location: null
        })
      }
    });
  }
}
