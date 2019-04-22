import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/sevices/AuthService';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private ngForm : FormGroup;
  private progressBar:number;
  private error:string;
  constructor(private authServ:AuthService,
              private navCtrl: NavController,
              private formBuilder: FormBuilder
             ) { }

  submit() {
    this.progressBar=0.2;
    this.authServ.doRegister(this.ngForm.value).then(
      res=>
      {
        this.progressBar=0.5;
        this.authServ.authUser.setUser(null,this.ngForm.value.email,res.user.uid)
        this.authServ.addUserInfos({idUser:res.user.uid,displayName:this.ngForm.value.fullName}).then(
          data=>{this.authServ.authUser.fullname=this.ngForm.value.fullName;this.registerSuccesful();},
          e=>{this.authServ.authUser.fullname="";this.registerSuccesful()}
        )
      },
      e=>{this.error=e.message;this.progressBar=0;}
    )
  }
  ngOnInit() {
    this.progressBar=0
    this.ngForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', [Validators.required,Validators.minLength(6)]],
      fullName:['',Validators.minLength(3)]
    });
    this.error=null;
  }

  resetError(){
    this.error=null;
  }

  registerSuccesful(){
    this.progressBar=1;
    this.navCtrl.navigateRoot('tabs')
  }

}
