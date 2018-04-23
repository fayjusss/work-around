import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  mynotiList: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth,
  public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
      this.afAuth.authState.take(1).subscribe(auth => {
        this.mynotiList = this.afs.collection('notification', ref => ref.where('getID','==',auth.uid)).valueChanges();
      })

    console.log('ionViewDidLoad NotificationsPage');
  }

}
