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

  send(messageText: string, timeStamp: string): Promise<void> {
    const messageId: string = this.firestore.createId();
    // const providerId: string = this.userId;

    return this.firestore
      .doc<Message>(`/chat/${messageId}`)
      .set({
        messageId,
        messageText,
        timeStamp
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
          `/chat`, // This creates the reference
          ref => ref.orderBy('timeStamp') // This is the query
      ).valueChanges();
  }

}
