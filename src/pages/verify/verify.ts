import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import {Bid} from "../../models/bid";
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  jobDetails: Bid;
  workerlist: Observable<any>;
  private jobDocument: AngularFirestoreDocument<any>;
  private bidDocument: AngularFirestoreDocument<any>;
  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, public navParams: NavParams, public modalCtrl: ModalController,public viewCtrl: ViewController,
  public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.jobDetails = this.navParams.data;
    this.workerlist = this.afs.collection('users', ref => ref.where('id','==',this.jobDetails.seekerID))
    .valueChanges();
    console.log('ionViewDidLoad VerifyPage');
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }

  acceptpayment(){
    this.jobDocument = this.afs.doc(`jobs/${this.jobDetails.jobId}`);
    this.jobDocument.update({
      status:'closed',

    })

    this.bidDocument = this.afs.doc(`bids/${this.jobDetails.bidId}`);
    this.bidDocument.update({
      status:'closed',

    })
    this.viewCtrl.dismiss();
  }

}
