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
  otherUsersId: string;
  userList: Observable<any[]>;

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

  navigateToStartNewDialogue() {
      let startNewDialogueModal = this.modalCtrl.create(NewDialoguePage);
      startNewDialogueModal.present();
  }

  openChat(chatId) {
    this.navCtrl.push('MessengerPage', {
      chatId: chatId
    });
  }

  userHasThisChat(chat) {
    if (chat.participant_1 == this.messengerProvider.userId)
    {
      this.otherUsersId = chat.participant_2;
      return true;
    } else if (chat.participant_2 == this.messengerProvider.userId)
    {
      this.otherUsersId = chat.participant_1;
      return true;
    }
    else {
      return false;
    }
  }

  isThisUser(user) {
    if (this.otherUsersId == user.id ) {
      return true;
    } else {
      return false;
    }
  }

  showOtherUsersName(user) {
    if (user) {
      if (this.otherUsersId == user.id) {
        return user.name;
      } else {
        return "Kotakbas Ivanovich";
      }
    }
  }
}
