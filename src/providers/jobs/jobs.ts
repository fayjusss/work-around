import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
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
        type: string,
        title: string,
        description: string,
        money: number,
        startDate: string,
        endDate: string
    ): Promise<void> {
        const jobId: string = this.fireStore.createId();
        const providerId: string = this.userId;

        return this.fireStore
            .doc<Job>(`/jobs/${jobId}`)
            .set({
                jobId,
                type,
                providerId,
                title,
                description,
                money,
                startDate,
                endDate
            });
    }
    getJobList(title : string): AngularFirestoreCollection<Job> {
        return this.fireStore.collection<Job>(
            `/jobs`, // This creates the reference
            ref => ref.orderBy('title') // This is the query
        );
    }
}
