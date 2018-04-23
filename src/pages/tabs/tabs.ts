import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { BrowseJobsPage } from "../browse-jobs/browse-jobs";
import { MyJobsPage } from "../my-jobs/my-jobs";
import { ChatsPage } from "../chats/chats";
import { NotificationsPage } from "../notifications/notifications";
import { ProfilePage } from '../profile/profile';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // set the root pages for each tab
    tab1Root: any = ChatsPage;
    tab2Root: any = BrowseJobsPage;
    tab3Root: any = MyJobsPage;
    tab4Root: any = NotificationsPage;
    tab5Root: any = ProfilePage;
    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 2;
    }

}
