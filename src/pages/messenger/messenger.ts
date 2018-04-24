import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Message } from '../../models/message';
import { MessengerProvider } from '../../providers/messenger/messenger';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-messenger',
  templateUrl: 'messenger.html',
})
export class MessengerPage {
  userId: string;
  chatId: string;
  messagesList: Observable<Message[]>;
  message: string = '';
  timeStamp: string;
  newmessage: string;

  constructor(
    public messengerProvider: MessengerProvider,
    public navCtrl: NavController,
    public navParams: NavParams)
  {
    this.userId = this.messengerProvider.userId;
    this.chatId = this.navParams.get('chatId');
    this.messengerProvider.setChatId(this.chatId);
    this.messagesList = this.messengerProvider
      .getMessagesList()
      .valueChanges()
  }

  async send(): Promise<any> {
    this.message = this.newmessage;
    this.timeStamp = moment().toISOString();
    this.newmessage = '';

    try {
      await this.messengerProvider.send(this.message, this.timeStamp);
    } catch (error) {
      console.log(error);
    }
    this.message = '';
  }

  getName() {

  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {
  }
}
