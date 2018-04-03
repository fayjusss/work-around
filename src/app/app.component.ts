import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp({
      apiKey: "AIzaSyCES0a3oJ36DR4aqC_kspkM_gyXwJbzZms",
      authDomain: "workaround-84153.firebaseapp.com",
      databaseURL: "https://workaround-84153.firebaseio.com",
      projectId: "workaround-84153",
      storageBucket: "workaround-84153.appspot.com",
      messagingSenderId: "369826061404"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    });
  }
}
