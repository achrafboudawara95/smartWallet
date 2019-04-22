import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/sevices/AuthService';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private ngForm : FormGroup;
  constructor(public authServ:AuthService,
    private formBuilder: FormBuilder,
    public alertController: AlertController){

  }
  ngOnInit(): void {
    this.ngForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }
  logout(){
    this.authServ.doLogout()
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  updatePassword(){
    this.authServ.updatePassword(this.ngForm.value.password).then(
      a=>a,
      err=>{
        this.presentAlert(err.message);
      }
    )
  }
}
