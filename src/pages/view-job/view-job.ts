import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
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
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.jobDetails = this.navParams.data;
    console.log(this.jobDetails);
    this.rate = 5;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  onStarModelChange(event) {
    console.log(event);
  }

}
