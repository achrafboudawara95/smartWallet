import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
// import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook } from '@ionic-native/facebook/ngx';
import { user } from '../models/USER'
import { snapshotToObject } from '../models/snapshotToObject'
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authUser:user=null;
  private database = firebase.database();
  constructor(
    private storage: Storage,
    public fb: Facebook,
    private afAuth: AngularFireAuth,
    private nav:NavController,
    public googlePlus: GooglePlus
  ){
    this.authUser=new user();
  }

  isAuthenticated(){
    return this.authUser.id!=null
  }

  storeUser(){
    this.storage.set('user', this.authUser);
  }

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  getUserInfos(idUser){
    this.database.ref('userInfo/'+idUser).on('value', resp => {
      this.authUser.fullname=snapshotToObject(resp).displayName
    });
  //   this.database.ref('userInfo/').orderByChild("userID").equalTo(idUser).on("child_added", function(data) {
  //     console.log("Equal to filter: " + data.val());
  //  });
  }

  addUserInfos(value){
    return this.database.ref('userInfo/'+value.idUser).set({
        userID: value.idUser,
        displayName:value.displayName
      });
  }

  async updatePassword(newPassword){
    var user = firebase.auth().currentUser;
    console.log(user);
    
    await user.updatePassword(newPassword).then(a=> {
      this.doLogout()
      return new Promise<any>((resolve, reject) => {
        resolve(a)
      })
    }).catch(function(error) {
      return new Promise<any>((resolve, reject) => {
        reject(error)
      })
    });
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  getFbCredential(token){
    return firebase.auth.FacebookAuthProvider.credential(token)
  }
  getGoogleCredential(token){
    return firebase.auth.GoogleAuthProvider.credential(token)
  }
  googleProvider(){
    return new firebase.auth.GoogleAuthProvider();
  }

  getFireBaseAuth(){
    return firebase.auth()
  }

	doLogout(){
    return new Promise(async (resolve, reject) => {
      await firebase.auth().signOut()
      .then(() => {
        this.authUser=new user();
        this.nav.navigateRoot('login')
        resolve()
      }).catch((error) => {
        reject();
      });
    })
  }
}