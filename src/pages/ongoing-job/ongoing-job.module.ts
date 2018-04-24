import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OngoingJobPage } from './ongoing-job';

@NgModule({
  declarations: [
    OngoingJobPage,
  ],
  imports: [
    IonicPageModule.forChild(OngoingJobPage),
  ],
})
export class OngoingJobPageModule {}
