import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {


  public myPerson = {};
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public app: App, 
    public navCtrl: NavController,
    public navParams: NavParams, 
    public authProvider: AuthData) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(auth =>{
      const personRef: firebase.database.Reference = firebase.database().ref(`/profile2/${auth.uid}`);
      personRef.on('value', personSnapshot => {
        this.myPerson = personSnapshot.val();
      });
    })

  }

  logoutUser(){
      this.authProvider.logoutUser().then( () => {
          this.app.getRootNav().setRoot('LoginPage');
      });
  }


  updateprofile(): void {
    this.navCtrl.push('ProfileupdatePage');
  }
}
