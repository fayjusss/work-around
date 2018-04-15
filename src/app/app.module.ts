import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { credentials } from './config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs'
import { AuthData } from '../providers/auth/auth';
import { BrowseJobsPage } from "../pages/browse-jobs/browse-jobs";
import {BiddingPage} from "../pages/bidding/bidding";
import { MyJobsPage } from "../pages/my-jobs/my-jobs";
import {ViewJobPage} from "../pages/view-job/view-job";
import { MessengerPage } from "../pages/messenger/messenger";
import { NotificationsPage } from "../pages/notifications/notifications";
import { ProfilePage } from "../pages/profile/profile";
import { AcceptBidPage } from "../pages/accept-bid/accept-bid";
import { WorkDonePage } from "../pages/work-done/work-done";
import {AccpetBidInfoPage} from "../pages/accpet-bid-info/accpet-bid-info";

import { JobsProvider } from '../providers/jobs/jobs';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    BrowseJobsPage,
    BiddingPage,
    HomePage,
    MyJobsPage,
    ViewJobPage,
    MessengerPage,
    NotificationsPage,
    ProfilePage,
    TabsPage,
    AcceptBidPage,
    WorkDonePage,
    AccpetBidInfoPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrowseJobsPage,
    BiddingPage,
    HomePage,
    WorkDonePage,
    MyJobsPage,
    ViewJobPage,
    MessengerPage,
    NotificationsPage,
    ProfilePage,
    TabsPage,
    AcceptBidPage,
    AccpetBidInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    JobsProvider
  ]
})
export class AppModule {}
