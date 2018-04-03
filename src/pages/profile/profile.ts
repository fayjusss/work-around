import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthData) {
  }

  logoutUser(){
      this.authProvider.logoutUser().then( () => {
          this.app.getRootNav().setRoot('LoginPage');
      });
  }

}
