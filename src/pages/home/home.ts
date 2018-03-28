import { Component } from '@angular/core';
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthData
  ) {

  }

  logoutUser(){
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  goToProfilePage(): void {
    this.navCtrl.push('ProfilePage');
  }

  goToBrowseJobs(): void {
    this.navCtrl.push('BrowseJobsPage');
  }

  goToAddJob(): void {
    this.navCtrl.push('AddJobPage');
  }
}
