import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import {Bid} from "../../models/bid";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the OngoingJobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ongoing-job',
  templateUrl: 'ongoing-job.html',
})
export class OngoingJobPage {
  jobDetails: Bid;
  workerList: Observable<any>;
  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, public navParams: NavParams, public modalCtrl: ModalController,public viewCtrl: ViewController,
  public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.jobDetails = this.navParams.data;
    this.workerList = this.afs.collection('users', ref => ref.where('id', '==', this.jobDetails.seekerID))
    .valueChanges();

  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  accept(){
    this.viewCtrl.dismiss();
  }

}
