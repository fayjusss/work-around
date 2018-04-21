import { Component } from '@angular/core';
import {
    App,
    Alert,
    AlertController,
    IonicPage,
    Loading,
    LoadingController,
    NavController,
    NavParams,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsProvider } from '../../providers/jobs/jobs';
import { AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";


@IonicPage()
@Component({
  selector: 'page-add-job',
  templateUrl: 'add-job.html',
})
export class AddJobPage {
  addJobForm: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public jobsProvider: JobsProvider,
              public app: App,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              formBuilder: FormBuilder) {
      this.addJobForm = formBuilder.group({
          type: ['', Validators.compose([Validators.required])],
          title: ['', Validators.compose([Validators.required])],
          description: ['', Validators.compose([Validators.required])],
          money: ['5', Validators.compose([Validators.required])],
          startDate: [''],
          endDate: ['']
      });
  }






  async addJob(): Promise<any> {
      if (!this.addJobForm.valid) {
          console.log('Form not ready');
      } else {
          // All the logic will live here.
          let loading: Loading;
          loading = this.loadingCtrl.create();
          loading.present();

          const type: string = this.addJobForm.value.type;
          const title: string = this.addJobForm.value.title;
          const description: string = this.addJobForm.value.description;
          const money: number = Number(this.addJobForm.value.money);
          const startDate: string = this.addJobForm.value.startDate;
          const endDate: string = this.addJobForm.value.endDate;
          const status:string = 'open';

          console.log(startDate);

          try {
              // Here we'll talk to the provider
              await this.jobsProvider.createJob(
                  type,
                  title,
                  description,
                  money,
                  startDate,
                  endDate,
                  status
              );
              await loading.dismiss();
              this.navCtrl.pop();
          } catch (error) {
              await loading.dismiss();
              const alert: Alert = this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ text: 'Ok', role: 'cancel' }],
              });
              alert.present();
          }
      }
  }
}
