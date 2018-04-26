import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseJobsPage } from './browse-jobs';

@NgModule({
  declarations: [
    BrowseJobsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseJobsPage),
  ],
})
export class BrowseJobsPageModule {}
