import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessengerProvider } from '../../providers/messenger/messenger';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-new-dialogue',
  templateUrl: 'new-dialogue.html',
})
export class NewDialoguePage {
  userList: Observable<any[]>;

  constructor(
    public messengerProvider: MessengerProvider,
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

  openNewChat() {
    var newChatId = this.messengerProvider.generateNewId();
    this.messengerProvider.createNewChat(newChatId)
    .then(data=> {
      this.navCtrl.push('MessengerPage', {
        chatId: newChatId
      });
    });
  }

}
