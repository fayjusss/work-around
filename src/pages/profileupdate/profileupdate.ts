import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profileupdate',
  templateUrl: 'profileupdate.html',
})
export class ProfileupdatePage {
  private userDocument: AngularFirestoreDocument<User>;
  user: Observable<User>;
  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public navCtrl: NavController) {
  }

  createProfile(name: string, age: number, location: string){

    this.afAuth.authState.take(1).subscribe(auth =>{
        this.userDocument = this.afs.doc<User>(`users/${auth.uid}`);
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
