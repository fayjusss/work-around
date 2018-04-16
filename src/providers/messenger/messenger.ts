import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Message } from '../../models/message';
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class MessengerProvider {
  chatId: string;
  userId: string;
  constructor(
      public afAuth: AngularFireAuth,
      public firestore: AngularFirestore
    ) {
    // this.chatId = this.navParams.get('chatId');
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  send(messageText: string, timeStamp: string): Promise<void> {
    const messageId: string = this.firestore.createId();
    const specialMessage: boolean = false;
    // const providerId: string = this.userId;

    return this.firestore
      .doc<Message>(`/chats/${chatId}/${messageId}`)
      .set({
        messageId,
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
    // const providerId: string = this.userId;

    return this.firestore
      .doc<Message>(`/chat/${messageId}`)
      .set({
        messageId,
        messageText,
        timeStamp,
        specialMessage,
      });
  }

  getMessagesList(): AngularFirestoreCollection<Message> {
      return this.firestore.collection<Message>(
          `/chats/`, // This creates the reference
          ref => ref.orderBy('timeStamp') // This is the query
      ).valueChanges();
  }

  getChatsList(): AngularFirestoreCollection<Message> {
      return this.firestore.collection(
          `/chats`, // This creates the reference
          ref => ref // This is the query
      ).snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log(id)
          return { id, ...data };
        })
      })
  }

  setChatId(chatId: string) {
    this.chatId = chatId;
  }

}
