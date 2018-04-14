import { Component } from '@angular/core';
import { IonicPage, NavController,App,ModalController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {AcceptBidPage} from '../accept-bid/accept-bid';
@IonicPage()
@Component({
  selector: 'page-my-jobs',
  templateUrl: 'my-jobs.html',
})
export class MyJobsPage {
  myjobList: Observable<any>;
  mybidList: Observable<any>;
    constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams,public authProvider: AuthData,private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public app: App) {
    }

    nagivateToCreateJob() {
        this.navCtrl.push('AddJobPage');
    }

    ionViewDidLoad() {
      this.afAuth.authState.take(1).subscribe(auth => {
          this.myjobList = this.afs.collection
              ('jobs', ref => ref.where('providerId', '==', auth.uid))
              .valueChanges();
          this.mybidList = this.afs.collection
              ('bids', ref => ref.where('seekerID','==',auth.uid).where('status','==','open'))
              .valueChanges();
          console.log(this.myjobList);
      })
    }

    presentBidModal(myjobList) {
        let viewBidModal = this.modalCtrl.create(AcceptBidPage, myjobList);
        viewBidModal.present();
    }

}
