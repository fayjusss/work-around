import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { Job } from '../../models/job';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { ViewJobPage } from "../view-job/view-job";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';


@IonicPage()
@Component({
  selector: 'page-browse-jobs',
  templateUrl: 'browse-jobs.html',
})
export class BrowseJobsPage {
  jobList: Observable<Job[]>;
  title: BehaviorSubject<string|null>;
  constructor(public navCtrl: NavController,
              public jobProvider: JobsProvider,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public fireStore: AngularFirestore) {
    this.title = new BehaviorSubject(null);

    this.jobList = Observable.combineLatest(
      this.title
   ).switchMap(([title]) =>
       this.fireStore.collection('/jobs', ref => {
         let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
         if (title) { query = query.where('title', '==', title) };
         return query;
       }).valueChanges()
     );
  }

  filterTitle(input: string|null) {
    this.title.next(input.srcElement.value);
  }

  formatDate(givenDate : string): string {
      return moment(givenDate).fromNow();
  }

  ionViewDidLoad() {
    console.log(this.jobList);
  }

  presentViewJobModal(job) {
      let viewJobModal = this.modalCtrl.create(ViewJobPage, job);
      viewJobModal.present();
  }
}
