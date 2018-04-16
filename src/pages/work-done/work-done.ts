import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Bid} from "../../models/bid";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
/**
 * Generated class for the WorkDonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-done',
  templateUrl: 'work-done.html',
})
export class WorkDonePage {
  bidDetails: Bid;
  bidinfo:Observable<any>;
  workinfo:Observable<any>;
  private jobDocument: AngularFirestoreDocument<any>;
  private bidDocument: AngularFirestoreDocument<any>;
  constructor(public navCtrl: NavController,public afs: AngularFirestore,public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.bidDetails = this.navParams.data;

    this.bidinfo = this.afs.collection('users', ref => ref.where('id','==',this.bidDetails.seekerID))
    .valueChanges();
    this.workinfo = this.afs.collection('jobs', ref => ref.where('jobId','==',this.bidDetails.jobId))
    .valueChanges();
    console.log('ionViewDidLoad WorkDonePage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
  Complete(){
    this.jobDocument = this.afs.doc(`jobs/${this.bidDetails.jobId}`);
    this.jobDocument.update({
      status:'closed',
    })

    this.bidDocument = this.afs.doc(`bids/${this.bidDetails.bidId}`);
    this.bidDocument.update({
      status:'closed',
    })
    this.viewCtrl.dismiss();
  }
}
