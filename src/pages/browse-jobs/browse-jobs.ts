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
  jobTitle: BehaviorSubject<string|null>;
  jobType: BehaviorSubject<string|null>;
  // minMoney: BehaviorSubject<string|null>;
  // maxMoney: BehaviorSubject<string|null>;

  constructor(public navCtrl: NavController,
              public jobProvider: JobsProvider,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public fireStore: AngularFirestore) {
    this.jobTitle = new BehaviorSubject(null);
    this.jobType = new BehaviorSubject(null);
    // this.minMoney = new BehaviorSubject(null);
    // this.maxMoney = new BehaviorSubject(null);

    this.jobList = Observable.combineLatest(
      this.jobTitle,
      this.jobType,
      // this.minMoney,
      // this.maxMoney
   ).switchMap(([title, type]) =>
       this.fireStore.collection('/jobs', ref => {
         let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

         // Checks whether to filter by title
         if (title != null && title != "") {
           var strSearch : string = title;
           var strlength : number = strSearch.length;
           var strFrontCode = strSearch.slice(0, strlength-1);
           var strEndCode = strSearch.slice(strlength-1, strSearch.length);

           var startcode = strSearch;
           var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

           query = query.where('title', '>=', startcode).where('title', '<', endcode);
         }

         // Checks whether to check the job type
         if (type !=null && type != "all") {
           query = query.where('type', '==', type);
         }
         
         return query;
       }).valueChanges()
     );
  }

  filterTitle(input: any) {
    this.jobTitle.next(input.srcElement.value);
  }

  filterType(type: string) {
    this.jobType.next(type);
  }

  filterMoney(input: any, minmax: number) {
    if (minmax == 1) {
      console.log("MIN: " +input.value);
    } else {
      console.log("MAX: " +input.value);
    }
    // var amount = Number(value);
    // this.jobType.next(type);
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
