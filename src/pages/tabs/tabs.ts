import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { BrowseJobsPage } from "../browse-jobs/browse-jobs";
import { JobsPage } from "../jobs/jobs";
import { MessengerPage } from "../messenger/messenger";
import { NotificationsPage } from "../notifications/notifications";
import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // set the root pages for each tab
    tab1Root: any = MessengerPage;
    tab2Root: any = BrowseJobsPage;
    tab3Root: any = JobsPage;
    tab4Root: any = NotificationsPage;
    tab5Root: any = ProfilePage;
    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }

}