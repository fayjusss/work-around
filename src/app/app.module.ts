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
import { JobsPage } from "../pages/jobs/jobs";
import { MessengerPage } from "../pages/messenger/messenger";
import { NotificationsPage } from "../pages/notifications/notifications";
import { ProfilePage } from "../pages/profile/profile";

import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { SignupPage } from "../pages/signup/signup";

import { JobsProvider } from '../providers/jobs/jobs';


@NgModule({
  declarations: [
    MyApp,
    BrowseJobsPage,
    HomePage,
    JobsPage,
    MessengerPage,
    NotificationsPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrowseJobsPage,
    HomePage,
    JobsPage,
    MessengerPage,
    NotificationsPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    TabsPage,

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
