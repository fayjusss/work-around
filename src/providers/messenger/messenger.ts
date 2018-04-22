import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Message } from '../../models/message';
import { Chat } from '../../models/chat';
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class MessengerProvider {
  chatId: string;
  userId: string;
  constructor(
      public afAuth: AngularFireAuth,
      public firestore: AngularFirestore
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  createNewChat(newChatId): Promise<void> {
    return this.firestore
      .doc<Chat>(`/chats/${newChatId}/`)
      .set({
      });
  }

  send(messageText: string, timeStamp: string): Promise<void> {
    const messageId: string = this.firestore.createId();
    const specialMessage: boolean = false;
    const senderId: string = this.userId;

    return this.firestore
      .doc<Message>(`/chats/${this.chatId}/messenger/${messageId}`)
      .set({
        senderId,
        messageText,
        timeStamp,
        specialMessage
      });
  }

  sendSpecialMessage(situation: string, timeStamp: string): Promise<void> {
    switch(situation) {
      case 'joined':
        situation = "You have joined the chat";
        break;
      case 'left':
        situation = "You have left the chat";
        break;
    }

    const messageId: string = this.firestore.createId();
    const messageText: string = situation;
    const specialMessage: boolean = true;
    const senderId: string = this.userId;

    return this.firestore
      .doc<Message>(`/chats/${this.chatId}/messenger/${messageId}`)
      .set({
        senderId,
        messageText,
        timeStamp,
        specialMessage
      });
  }

  generateNewId() {
    return this.firestore.createId();
  }

  getMessagesList(): AngularFirestoreCollection<any> {
      return this.firestore.collection<any>(
          `/chats/${this.chatId}/messenger/`,
          ref => ref.orderBy('timeStamp')
      )
  }

  getChatsList(): AngularFirestoreCollection<any> {
      return this.firestore.collection<any>(
          `/chats`,
          ref => ref
      )
  }

  getUsersList(): AngularFirestoreCollection<any> {
      return this.firestore.collection<any>(
          `/users`,
          ref => ref
      )
  }
  setChatId(chatId: string) {
    this.chatId = chatId;
  }

}
