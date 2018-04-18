import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import {Bid} from "../../models/bid";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
/**
 * Generated class for the AccpetBidInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accpet-bid-info',
  templateUrl: 'accpet-bid-info.html',
})
export class AccpetBidInfoPage {
  bidDetails: Bid;
  bidinfo:Observable<any>;
  private jobDocument: AngularFirestoreDocument<any>;
  private bidDocument: AngularFirestoreDocument<any>;
  constructor(public navCtrl: NavController,public afs: AngularFirestore,public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.bidDetails = this.navParams.data;
    this.bidinfo = this.afs.collection('users', ref => ref.where('id','==',this.bidDetails.seekerID))
    .valueChanges();
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

  acceptbid(){
    this.jobDocument = this.afs.doc(`jobs/${this.bidDetails.jobId}`);
    this.jobDocument.update({
      status:'ongoing',
      money: this.bidDetails.payRequest,
      time:this.bidDetails.time,

    })

    this.bidDocument = this.afs.doc(`bids/${this.bidDetails.bidId}`);
    this.bidDocument.update({
      status:'ongoing',

    })
    this.viewCtrl.dismiss();
  }

}
