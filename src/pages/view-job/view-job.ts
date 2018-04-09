import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController } from 'ionic-angular';
import {BiddingPage} from "../bidding/bidding";
import {Job} from "../../models/job";

/**
 * Generated class for the ViewJobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  onStarModelChange(event) {
    console.log(event);
  }

}
