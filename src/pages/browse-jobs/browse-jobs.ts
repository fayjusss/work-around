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
  minMoney: number;
  maxMoney: number;
  startDate: any;
  endDate: any;

  constructor(public navCtrl: NavController,
              public jobProvider: JobsProvider,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public fireStore: AngularFirestore) {
    this.jobTitle = new BehaviorSubject(null);
    this.jobType = new BehaviorSubject(null);
    this.minMoney = 0;
    this.maxMoney = Infinity;
    this.startDate = null;
    this.endDate = null;

    this.jobList = Observable.combineLatest(
      this.jobTitle,
      this.jobType
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

         if (status !=null && status != "ongoing"&& status != "closed") {
           query = query.where('status', '==', 'open');
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
      if (input.value.length == 0) {
        this.minMoney = 0;
      } else {
        // This affects the minimum
        this.minMoney = input.value;
      }
    } else {
      if (input.value.length == 0) {
        this.maxMoney = 0;
      } else {
        // This goes to maximum
        this.maxMoney = input.value;
      }
    }
  }

  filterDate(input: any, startend: number) {
    if (startend == 1) {
      // This sets the starting date
      this.startDate = moment("" + input.year + "-" + input.month + "-" + input.day);
    } else {
      // This goes to maximum
      this.endDate = moment("" + input.year + "-" + input.month + "-" + input.day);
    }
  }

  checkStartDate(seDate: string) {
    if (this.startDate != null && seDate) {
      if (moment(seDate).isSameOrAfter(this.startDate)) {
        return true;
      } else {
        return false;
      }
    } else if (this.startDate != null && !seDate) {
      return false;
    } else {
      return true;
    }
  }

  checkEndDate(seDate: string) {
    if (this.endDate != null && seDate) {
      if (moment(seDate).isSameOrBefore(this.endDate)) {
        return true;
      } else {
        return false;
      }
    } else if (this.endDate != null && !seDate) {
      return false;
    } else {
      return true;
    }
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
