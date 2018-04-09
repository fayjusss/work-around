import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my-jobs',
  templateUrl: 'my-jobs.html',
})
export class MyJobsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    nagivateToCreateJob() {
        this.navCtrl.push('AddJobPage');
    }

}
