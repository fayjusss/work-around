import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDialoguePage } from './new-dialogue';

@NgModule({
  declarations: [
    NewDialoguePage,
  ],
  imports: [
    IonicPageModule.forChild(NewDialoguePage),
  ],
})
export class NewDialoguePageModule {}
