import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Job } from '../../models/job';
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class JobsProvider {
    userId: string;
    constructor(
        public afAuth: AngularFireAuth,
        public fireStore: AngularFirestore
    ) {
        afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
        });
    }
    createJob(
        title: string,
        description: string,
    ): Promise<void> {
        const jobId: string = this.fireStore.createId();

        return this.fireStore
            .doc<Job>(`/jobs/${jobId}`)
            .set({
                jobId,
                title,
                description
            });
    }
    getJobList(): AngularFirestoreCollection<Job> {
        return this.fireStore.collection<Job>(
            `/jobs`, // This creates the reference
            ref => ref.orderBy('title') // This is the query
        );
    }
}
