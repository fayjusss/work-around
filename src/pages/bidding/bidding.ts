import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Job} from "../../models/job";
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the BiddingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
})
export class BiddingPage {
  private userDocument: AngularFirestoreDocument<any>;
  jobDetails: Job;
  mybidList: Observable<any>;
  constructor(public viewCtrl: ViewController, public navParams: NavParams,public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {
    this.jobDetails = this.navParams.data;
  }

  closeModal() {

  }

  createmybid(jobDetails:any, money:number, days: number, message:string){
    this.afAuth.authState.take(1).subscribe(auth =>{

      const providerId= this.jobDetails.providerId;
      const startDate= this.jobDetails.startDate;
      const type= this.jobDetails.type;
      const status= this.jobDetails.status;
      const providerMoneyOffer= this.jobDetails.money;
      const title= this.jobDetails.title;
      const jobId = this.jobDetails.jobId;

      const bidId: string = this.afs.createId();
        this.userDocument = this.afs.doc(`bids/${bidId}`);

        this.userDocument.set({
          bidId:bidId,
          title:title,
          startDate: startDate,
          type: type,
          providerMoneyOffer:providerMoneyOffer,
          jobId: jobId,
          providerId: providerId,
          seekerID: auth.uid,
          time: days,
          payRequest: money,
          bidProposal: message,
          status:status,

        })
      })
      this.viewCtrl.dismiss();
  }


}
