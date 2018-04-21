import { Component } from '@angular/core';
import { App, IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public loading: Loading;

  userProfile: Observable<any>;
  profileUrl: Observable<string | null>;
  selectedPhoto: string;

  constructor(
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public storage: AngularFireStorage,
    public app: App,
    public navCtrl: NavController,
    public authProvider: AuthData,
    public loadingCtrl: LoadingController,
    private camera: Camera,
  ) {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.userProfile = this.afs.collection
        ('users', ref => ref.where('id', '==', auth.uid))
        .valueChanges();
    })

    const ref = this.storage.ref('profile-pics/' + this.authProvider.userId + '.jpg');
    this.profileUrl = ref.getDownloadURL()
  }

  ionViewDidLoad() {

  }

  logoutUser(){
    this.authProvider.logoutUser().then( () => {
      this.app.getRootNav().setRoot('LoginPage');
    });
  }

  updateprofile(): void {
    this.navCtrl.push('ProfileupdatePage');
  }

  changeProfilePic() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        // this.loading = this.loadingCtrl.create({
        //   content: 'Please wait...'
        // });
        // this.loading.present();

        this.selectedPhoto = 'data:image/jpeg;base64,' + imageData;

        // this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
        //
        // this.upload();

      }, (err) => {
         // Handle error
         console.log(err)
      });
  }

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  upload() {
    if (this.selectedPhoto) {
      const filePath = '/images/' + this.authProvider.userId + '.jpg';
      const task = this.storage.upload(filePath, this.selectedPhoto);
    }
  }
}
