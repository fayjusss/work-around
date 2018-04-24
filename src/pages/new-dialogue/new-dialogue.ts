import { Component } from '@angular/core';
import {
  IonicPage,
  ViewController,
  NavController,
  NavParams,
  Loading,
  LoadingController,
} from 'ionic-angular';
import { MessengerProvider } from '../../providers/messenger/messenger';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-new-dialogue',
  templateUrl: 'new-dialogue.html',
})
export class NewDialoguePage {
  userList: Observable<any[]>;
  public loading: Loading;

  constructor(
    public messengerProvider: MessengerProvider,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams)
  {
    this.userList = this.messengerProvider
      .getUsersList()
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
  }

  openNewChat(otherUsersId) {
    console.log(otherUsersId)
    var newChatId = this.messengerProvider.generateNewId();
    this.messengerProvider.createNewChat(newChatId, otherUsersId)
    .then( data => {
      this.loading.dismiss().then( () => {
        this.navCtrl.push('MessengerPage', {
          chatId: newChatId
        });
        // Closes the new-dialogue modal
        this.closeModal();
      })
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
