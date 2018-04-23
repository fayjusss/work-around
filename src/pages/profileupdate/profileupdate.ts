import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from 'angularfire2/storage';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profileupdate',
  templateUrl: 'profileupdate.html',
})
export class ProfileupdatePage {
  userId: string;
  profileUrl: Observable<string | null>;
  showSpinner : boolean = true;
  private userDocument: AngularFirestoreDocument<any>;
  user: Observable<any>;
  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public storage: AngularFireStorage,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {
    this.userId = this.navParams.get('userId');
    console.log(this.userId)
    const ref = this.storage.ref('profile-pics/' + this.userId + '.jpg')
    this.profileUrl = ref.getDownloadURL();
    this.profileUrl.subscribe(() => {
      this.showSpinner = false;
    }, err => {
      // Fetches the cat image if the profile pic doesn't exist
      this.showSpinner = true;
      this.profileUrl = this.storage.ref('profile-pics/cat.jpg').getDownloadURL();
      this.profileUrl.subscribe(() => {
        this.showSpinner = false;
      }, err => {
        console.log(err);
      })
    })
  }

  createProfile(name: string, age: number, location: string){

    this.afAuth.authState.take(1).subscribe(auth =>{
        this.userDocument = this.afs.doc(`users/${auth.uid}`);
        // const personRef: firebase.database.Reference = firebase.database().ref(`/profile2/${auth.uid}`);
        // personRef.set({
        //   name,
        //   age,
        //   location
        // })
        this.userDocument.update({
          name: name,
          age: age,
          location: location
        })
      })

      this.navCtrl.pop();
  }

}
