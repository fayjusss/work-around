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

import { MyJobsPage } from "../pages/my-jobs/my-jobs";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs'
import { AuthData } from '../providers/auth/auth';
import { BrowseJobsPage } from "../pages/browse-jobs/browse-jobs";
import { BiddingPage } from "../pages/bidding/bidding";

import { ViewJobPage } from "../pages/view-job/view-job";
import { ChatsPage } from "../pages/chats/chats";
import { NotificationsPage } from "../pages/notifications/notifications";
import { ProfilePage } from "../pages/profile/profile";
import { NewDialoguePage } from "../pages/new-dialogue/new-dialogue";
import { AcceptBidPage } from "../pages/accept-bid/accept-bid";
import { WorkDonePage } from "../pages/work-done/work-done";
import {AccpetBidInfoPage} from "../pages/accpet-bid-info/accpet-bid-info";
import {VerifyPage} from "../pages/verify/verify";

import { JobsProvider } from '../providers/jobs/jobs';

import { Ionic2RatingModule } from 'ionic2-rating';
import { MessengerProvider } from '../providers/messenger/messenger';

@NgModule({
  declarations: [
    MyJobsPage,
    MyApp,
    BrowseJobsPage,
    BiddingPage,
    HomePage,

    ViewJobPage,
    ChatsPage,
    NotificationsPage,
    ProfilePage,
    TabsPage,
    NewDialoguePage,
    AcceptBidPage,
    WorkDonePage,
    AccpetBidInfoPage,
    VerifyPage,
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
    MyJobsPage,
    MyApp,
    BrowseJobsPage,
    BiddingPage,
    HomePage,
    WorkDonePage,

    ViewJobPage,
    ChatsPage,
    NotificationsPage,
    ProfilePage,
    TabsPage,
    NewDialoguePage,
    AcceptBidPage,
    AccpetBidInfoPage,
    VerifyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    JobsProvider,
    MessengerProvider
  ]
})
export class AppModule {}
