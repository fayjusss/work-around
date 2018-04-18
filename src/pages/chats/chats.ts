import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chat } from '../../models/chat';
import { MessengerProvider } from '../../providers/messenger/messenger';
import { Observable } from 'rxjs/Observable';
import { MessengerPage } from "../messenger/messenger";
import { NewDialoguePage } from "../new-dialogue/new-dialogue";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  chatList: Observable<any[]>;

  constructor(
    public messengerProvider: MessengerProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
  )
  {
    this.chatList = this.messengerProvider
      .getChatsList()
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
  }

  navigateToStartNewDialogue() {
      let startNewDialogueModal = this.modalCtrl.create(NewDialoguePage);
      startNewDialogueModal.present();
  }

  openChat(chatId) {
    this.navCtrl.push('MessengerPage', {
      chatId: chatId
    });
  }
}
