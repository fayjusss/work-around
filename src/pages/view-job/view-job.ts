import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController } from 'ionic-angular';
import {BiddingPage} from "../bidding/bidding";
import {Job} from "../../models/job";

@IonicPage()
@Component({
  selector: 'page-view-job',
  templateUrl: 'view-job.html',
})
export class ViewJobPage {
  jobDetails: Job;
  rate: number;
  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.jobDetails = this.navParams.data;
    this.rate = 5;
  }

  presentBiddingModal() {
      let biddingModal = this.modalCtrl.create(BiddingPage, this.jobDetails);
      biddingModal.present();
      this.viewCtrl.dismiss();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  onStarModelChange(event) {
    console.log(event);
  }

}
