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
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-browse-jobs',
  templateUrl: 'browse-jobs.html',
})
export class BrowseJobsPage {
  jobList: Observable<any[]>;
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

         if (title != null && title != "") {
           var strSearch : string = title;
           var strlength : number = strSearch.length;
           var strFrontCode = strSearch.slice(0, strlength-1);
           var strEndCode = strSearch.slice(strlength-1, strSearch.length);

           var startcode = strSearch;
           var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

           query = query.where('title', '>=', startcode).where('title', '<', endcode);
         }

         return query;
       }).valueChanges()
     );
  }

  filterTitle(input: any) {
    this.title.next(input.srcElement.value);
  }

  formatDate(givenDate : string): string {
      return moment(givenDate).fromNow();
  }

  ionViewDidLoad() {
  }

  presentViewJobModal(job) {
      let viewJobModal = this.modalCtrl.create(ViewJobPage, job);
      viewJobModal.present();
  }
}
