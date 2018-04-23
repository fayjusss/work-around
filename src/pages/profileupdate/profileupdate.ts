import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireStorage } from 'angularfire2/storage';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profileupdate',
  templateUrl: 'profileupdate.html',
})
export class ProfileupdatePage {
  userId: string;
  updateProfileForm: FormGroup;
  userProfile: Observable<any>;
  profileUrl: Observable<string | null>;
  showSpinner : boolean = true;
  private userDocument: AngularFirestoreDocument<any>;
  user: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public storage: AngularFireStorage,
    public navParams: NavParams,
    public navCtrl: NavController,
    formBuilder: FormBuilder
  ) {
    this.userId = this.navParams.get('userId');

    this.updateProfileForm = formBuilder.group({
      name: [''],
      age: [''],
      location: ['']
    });

    this.userProfile = this.afs.collection
      ('users', ref => ref.where('id', '==', this.userId))
      .valueChanges();

    const ref = this.storage.ref('profile-pics/' + this.userId + '.jpg')
    this.profileUrl = ref.getDownloadURL();
    this.profileUrl.subscribe(() => {
      this.showSpinner = false;
    }, err => {
      // Fetches the cat image if the profile pic doesn't exist
      this.showSpinner = true;
      this.profileUrl = this.storage.ref('profile-pics/cat.jpg').getDownloadURL();
      this.profileUrl.subscribe(() => {
        this.showSpinner = false;
      }, err => {
        console.log(err);
      })
    })
  }

  createProfile() {
    var name: string = this.updateProfileForm.value.name;
    var age: number | string = Number(this.updateProfileForm.value.age);
    var location: string = this.updateProfileForm.value.location;

    if (age == 0 || isNaN(age)) {
      console.log(age)
      age = "Age is not specified";
    }

    this.afAuth.authState.take(1).subscribe(auth =>{
        this.userDocument = this.afs.doc(`users/${auth.uid}`);
        this.userDocument.update({
          name: name,
          age: age,
          location: location
        })
      })
    this.navCtrl.pop();
  }

}
