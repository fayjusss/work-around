import { Component } from '@angular/core';
import {
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
              formBuilder: FormBuilder) {
      this.addJobForm = formBuilder.group({
          title: ['', Validators.compose([Validators.required])],
          description: ['', Validators.compose([Validators.required])],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddJobPage');
  }

  async addJob(): Promise<any> {
      if (!this.addJobForm.valid) {
          console.log('Form not ready');
      } else {
          // All the logic will live here.
          let loading: Loading;
          loading = this.loadingCtrl.create();
          loading.present();

          const title: string = this.addJobForm.value.title;
          const description: string = this.addJobForm.value.description;

          try {
              // Here we'll talk to the provider
              await this.jobsProvider.createJob(
                  title,
                  description,
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
