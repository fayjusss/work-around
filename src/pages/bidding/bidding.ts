import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Job} from "../../models/job";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
})
export class BiddingPage {
  biddingForm: FormGroup;
  private userDocument: AngularFirestoreDocument<any>;
  jobDetails: Job;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    formBuilder: FormBuilder
  ) {
    this.jobDetails = this.navParams.data;

    this.biddingForm = formBuilder.group({
      money: ['', Validators.compose([Validators.required])],
      days: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  createMyBid(
    jobDetails: any,
  ) {
    this.afAuth.authState.take(1).subscribe(auth =>{

      const providerId= this.jobDetails.providerId;
      const startDate= this.jobDetails.startDate;
      const endDate= this.jobDetails.endDate;
      const type= this.jobDetails.type;
      const status= this.jobDetails.status;
      const providerMoneyOffer= this.jobDetails.money;
      const title= this.jobDetails.title;
      const jobId = this.jobDetails.jobId;
      const bidId: string = this.afs.createId();
      const money: number = Number(this.biddingForm.value.money);
      const days: number = Number(this.biddingForm.value.days);
      const message: string = this.biddingForm.value.message;

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
        endDate:endDate,
      })

    })

    this.viewCtrl.dismiss();
    // Shows alert
    let alert = this.alertCtrl.create({
      title: 'Done!',
      subTitle: 'Your bid was successfully added! Now, contact the job provider.',
      buttons: ['OK']
    });
    alert.present();
  }

}
