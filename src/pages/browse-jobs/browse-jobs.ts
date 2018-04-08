import { Component } from '@angular/core';
import { Alert, AlertController, NavController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { Job } from '../../models/job';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-browse-jobs',
  templateUrl: 'browse-jobs.html',
})
export class BrowseJobsPage {
  jobList: Observable<Job[]>;
  constructor(public navCtrl: NavController,
              public jobProvider: JobsProvider,
              public alertCtrl: AlertController) {
    this.jobList = this.jobProvider
      .getJobList()
      .valueChanges();
  }

  formatDate(givenDate : string): string {
      return moment(givenDate).fromNow();
  }

  ionViewDidLoad() {
  }
}
