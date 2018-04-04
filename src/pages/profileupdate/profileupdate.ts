import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

/**
 * Generated class for the ProfileupdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileupdate',
  templateUrl: 'profileupdate.html',
})
export class ProfileupdatePage {
  public myPerson = {};
  constructor(private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
  }

  createProfile(name: string, age: number, location: string){
    this.afAuth.authState.take(1).subscribe(auth =>{
      const personRef: firebase.database.Reference = firebase.database().ref(`/profile2/${auth.uid}`);
      personRef.set({
      name,
      age,
      location
    })
  })
  this.navCtrl.pop();
};
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileupdatePage');
  }

}
