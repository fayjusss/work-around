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
  messagesList: Observable<any[]>;
  message: string = '';
  timeStamp: string;
  // _chatSubscription;
  // messages: object[] = [];

  constructor(
    public messengerProvider: MessengerProvider,
    public navCtrl: NavController,
    public navParams: NavParams)
  {
    this.messagesList = this.messengerProvider
      .getMessagesList()
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

  ionViewDidLoad() {
    try {
      this.messengerProvider.sendSpecialMessage("joined", moment().toISOString());
    } catch (error) {
      console.log(error);
    }
  }

  ionViewWillLeave(){
    // try {
    //   this.messengerProvider.sendSpecialMessage("left", moment().toISOString());
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
