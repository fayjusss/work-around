import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { credentials } from './config';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs'
import { AuthData } from '../providers/auth/auth';
import { BrowseJobsPage } from "../pages/browse-jobs/browse-jobs";
import { BiddingPage } from "../pages/bidding/bidding";
import { MyJobsPage } from "../pages/my-jobs/my-jobs";
import { ViewJobPage } from "../pages/view-job/view-job";
import { ChatsPage } from "../pages/chats/chats";
import { IntroPage } from "../pages/intro/intro";
import { NotificationsPage } from "../pages/notifications/notifications";
import { ProfilePage } from "../pages/profile/profile";
import { NewDialoguePage } from "../pages/new-dialogue/new-dialogue";
import { AcceptBidPage } from "../pages/accept-bid/accept-bid";
import { WorkDonePage } from "../pages/work-done/work-done";
import { AccpetBidInfoPage } from "../pages/accpet-bid-info/accpet-bid-info";
import { VerifyPage } from "../pages/verify/verify";
import { LoginPage } from "../pages/login/login";
import { AddJobPage } from "../pages/add-job/add-job";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { ProfileupdatePage } from "../pages/profileupdate/profileupdate";
import { ResetPasswordPage } from "../pages/reset-password/reset-password";

import { Ionic2RatingModule } from 'ionic2-rating';
import { JobsProvider } from '../providers/jobs/jobs';
import { MessengerProvider } from '../providers/messenger/messenger';
import { Camera } from '@ionic-native/camera';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {SignupPage} from "../pages/signup/signup";


@NgModule({
  declarations: [
    MyApp,
    BrowseJobsPage,
    BiddingPage,
    HomePage,
    MyJobsPage,
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
    LoginPage,
    AddJobPage,
    EditProfilePage,
    ProfileupdatePage,
    ResetPasswordPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RoundProgressModule,
    AngularFireStorageModule,
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
    ChatsPage,
    NotificationsPage,
    ProfilePage,
    TabsPage,
    NewDialoguePage,
    AcceptBidPage,
    AccpetBidInfoPage,
    VerifyPage,
    LoginPage,
    AddJobPage,
    EditProfilePage,
    ProfileupdatePage,
    ResetPasswordPage,
    SignupPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    JobsProvider,
    MessengerProvider
  ]
})
export class AppModule {}
