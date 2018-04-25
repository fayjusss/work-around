import { Component } from '@angular/core';
import { IonicPage, NavController,App,ModalController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import {AcceptBidPage} from '../accept-bid/accept-bid';
import {WorkDonePage} from '../work-done/work-done';
import { VerifyPage } from '../verify/verify';
import {BidInfoPage} from '../bid-info/bid-info';
import {OngoingJobPage} from "../ongoing-job/ongoing-job";

@IonicPage()
@Component({
  selector: 'page-my-jobs',
  templateUrl: 'my-jobs.html',
})

export class MyJobsPage {
  myjobList: Observable<any>;
  mybidList: Observable<any>;
  ongoingList: Observable<any>;
  workingList: Observable<any>;
  completedList: Observable<any>;
  uncompletedList:Observable<any>;
  option: any = "providing";


    constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public authProvider: AuthData,
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public app: App) {
    }

    nagivateToCreateJob() {
        this.navCtrl.push('AddJobPage');
    }

    ionViewDidLoad() {
      this.afAuth.authState.take(1).subscribe(auth => {
          this.myjobList = this.afs.collection
              ('jobs', ref => ref.where('providerId', '==', auth.uid).where('status','==','open'))
              .valueChanges();

          this.mybidList = this.afs.collection
              ('bids', ref => ref.where('seekerID','==',auth.uid).where('status','==','open'))
              .valueChanges();
          this.ongoingList = this.afs.collection
                  ('bids', ref => ref.where('providerId', '==', auth.uid).where('status','==','ongoing'))
                  .valueChanges();
        this.workingList = this.afs.collection
                      ('bids', ref => ref.where('seekerID','==',auth.uid).where('status','==','ongoing'))
                      .valueChanges();
        this.completedList = this.afs.collection
                ('bids', ref => ref.where('providerId', '==', auth.uid).where('status','==','completed'))
                .valueChanges();
        this.uncompletedList = this.afs.collection
                  ('bids', ref => ref.where('providerId', '==', auth.uid).where('status','==','uncomplete'))
                        .valueChanges();
      })
    }
    presentBidModal(myjobList) {
        let viewBidModal = this.modalCtrl.create(AcceptBidPage, myjobList);
        viewBidModal.present();
    }

    presentverifyModal(completedList){
      let viewverifyModal = this.modalCtrl.create(VerifyPage, completedList);
      viewverifyModal.present();
    }

    presentWorkingModal(workingList){
      let viewWorkModal = this.modalCtrl.create(WorkDonePage, workingList);
      viewWorkModal.present();
    }

    presentBidInfoModal(myBid){
      let BidInfoModal = this.modalCtrl.create(BidInfoPage, myBid);
      BidInfoModal.present();
    }

    presentOngoingModal(ongoingJob){
      let OngoingModal = this.modalCtrl.create(OngoingJobPage, ongoingJob);
      OngoingModal.present();
    }

    showjoblist(){
      if(this.myjobList ==null){
        this.afAuth.authState.take(1).subscribe(auth => {
            this.myjobList = this.afs.collection
                ('jobs', ref => ref.where('providerId', '==', auth.uid).where('status','==','open'))
                .valueChanges();
              })

      }
      else{
      ;
        this.myjobList =null;
      }
    }

    showbidlist(){
      if(this.mybidList == null){
        this.afAuth.authState.take(1).subscribe(auth => {
          this.mybidList = this.afs.collection
              ('bids', ref => ref.where('seekerID','==',auth.uid).where('status','==','open'))
              .valueChanges();
        })
      }
      else{
        this.mybidList = null;
      }

    }

    showongoinglist(){
      if(this.ongoingList == null){
        this.afAuth.authState.take(1).subscribe(auth => {
          this.ongoingList = this.afs.collection
                  ('jobs', ref => ref.where('providerId', '==', auth.uid).where('status','==','ongoing'))
                  .valueChanges();
        })
      }
      else{
        this.ongoingList = null;
      }
    }

    showcurrentlist(){
      if(this.workingList ==null){
        this.afAuth.authState.take(1).subscribe(auth => {
          this.workingList = this.afs.collection
                        ('bids', ref => ref.where('seekerID','==',auth.uid).where('status','==','ongoing'))
                        .valueChanges();
        })
      }
      else{
        this.workingList = null;
      }
    }

    vertifylist(){
      if(this.completedList!=null){
        this.completedList=null;
      }
      else{
        this.afAuth.authState.take(1).subscribe(auth => {
        this.completedList = this.afs.collection
                ('bids', ref => ref.where('providerId', '==', auth.uid).where('status','==','completed'))
                .valueChanges();
              })
      }

      if(this.uncompletedList !=null){
        this.uncompletedList = null;
      }
      else{
        this.afAuth.authState.take(1).subscribe(auth => {
        this.uncompletedList = this.afs.collection
                  ('bids', ref => ref.where('providerId', '==', auth.uid).where('status','==','uncomplete'))
                        .valueChanges();
                      })
      }
    }
}
