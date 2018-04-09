import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Job } from '../../models/job';
import {Bid} from "../../models/bid";
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

    //Creates a job entry in the jobs collection in firebase
    createJob(
        title: string,
        description: string,
    ): Promise<void> {
        const jobId: string = this.fireStore.createId();
        const providerId: string = this.userId;

        return this.fireStore
            .doc<Job>(`/jobs/${jobId}`)
            .set({
                jobId,
                providerId,
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
    
    //Creates a bid entry in the bids collection in firebase
    createBid(
        jobId: string,
        time: string,
        payRequest: string,
        bidProposal: string,
    ): Promise<void> {
        const bidId: string = this.fireStore.createId();
        const seekerId: string = this.userId;

        return this.fireStore
            .doc<Bid>(`/jobs/${jobId}`)
            .set({
                bidId,
                jobId,
                seekerId,
                time,
                payRequest,
                bidProposal
            });
    }

}
