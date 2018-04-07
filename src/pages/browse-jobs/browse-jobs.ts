import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { Job } from '../../models/job';
import { Observable } from 'rxjs/Observable';
import {ViewJobPage} from "../view-job/view-job";

@IonicPage()
@Component({
  selector: 'page-browse-jobs',
  templateUrl: 'browse-jobs.html',
})
export class BrowseJobsPage {
  jobList: Observable<Job[]>;
  constructor(public navCtrl: NavController,
              public jobProvider: JobsProvider,
              public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.jobList = this.jobProvider
        .getJobList()
        .valueChanges();
  }
    
  presentViewJobModal(job) {
      let viewJobModal = this.modalCtrl.create(ViewJobPage, job);
      viewJobModal.present();
  }
}
