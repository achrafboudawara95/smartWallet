import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../sevices/AuthService';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private ngForm : FormGroup;
  private error:string;
  private loader:any;
  constructor(private authServ:AuthService,
              private storage: Storage,
              private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private splashScreen: SplashScreen,
              public loadingController: LoadingController) 
              {
                this.storage.get('user').then(
                  data=>{
                    this.ngForm = this.formBuilder.group({
                      email: [data.email, Validators.email],
                      password: [data.password, Validators.required],
                    });
                  }
                )
              }

  async ngOnInit() {
    this.ngForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
    this.error=null;
    this.splashScreen.hide()
  }

  resetError(){
    this.error=null;
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: 'Loading',
      duration: 10000
    });
    await this.loader.present();
  }

  dismissLoading(){
    this.loader.dismiss();
  }

  submit(){
    this.presentLoading()
    this.authServ.doLogin(this.ngForm.value).then(data=>{
            this.authServ.authUser.setUser(data.user.displayName,data.user.email,data.user.uid);
            this.authServ.getUserInfos(data.user.uid);
            this.loginSuccesful()},
            err=>{this.error=err.message}
            )
  }

  fbLogin(){
    this.authServ.fb.login(['email'])
    .then((data) => {
      this.presentLoading()
      let token= data.authResponse.accessToken;
      let caredential=this.authServ.getGoogleCredential(token)
      this.authServ.getFireBaseAuth().signInAndRetrieveDataWithCredential(caredential)
      .then(
        data => {this.authServ.authUser.setUser(data.user.displayName,data.user.email,data.user.uid,data.user.photoURL)
          this.loginSuccesful()
        },
        err  => {this.error=err.message
        }
      )
    })
    .catch(e => {this.error="Error while connecting to Facebook"
    });
  }

  googleLogin(){
    this.authServ.googlePlus.login({}).then(
      res=>{
        console.log(res);
        this.presentLoading()
        let caredential=this.authServ.getGoogleCredential(res.idToken)
        this.authServ.getFireBaseAuth().signInAndRetrieveDataWithCredential(caredential)
        .then(
          data => {this.authServ.authUser.setUser(data.user.displayName,data.user.email,data.user.uid,data.user.photoURL)
            this.loginSuccesful()
          },
          err  => {this.error=err.message
          }
        )
      }
    ).catch(
      err=>{

        err => {this.error="Error while connecting to Google"}
      }
    )
  }

  loginSuccesful(){
    this.storage.set('user', {email:this.ngForm.value.email,password:this.ngForm.value.password});
    this.navCtrl.navigateRoot('tabs')
    this.dismissLoading();
  }

  register(){
    this.navCtrl.navigateForward('signup');
  }

}
