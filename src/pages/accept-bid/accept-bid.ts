import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import {Job} from "../../models/job";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
/**
 * Generated class for the AcceptBidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accept-bid',
  templateUrl: 'accept-bid.html',
})
export class AcceptBidPage {
  jobDetails: Job;
  mybidList: Observable<any>;
  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, public navParams: NavParams, public modalCtrl: ModalController,public viewCtrl: ViewController,
  public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.jobDetails = this.navParams.data;
    this.afAuth.authState.take(1).subscribe(auth => {

        this.mybidList = this.afs.collection
            ('bids', ref => ref.where('providerId','==',auth.uid).where('jobId','==',this.jobDetails.jobId))
            .valueChanges();
        

    })
    console.log('ionViewDidLoad AcceptBidPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
