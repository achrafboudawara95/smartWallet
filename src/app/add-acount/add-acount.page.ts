import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AcountService } from '../../sevices/AcountService'
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-acount',
  templateUrl: './add-acount.page.html',
  styleUrls: ['./add-acount.page.scss'],
})
export class AddAcountPage implements OnInit {
  private ngForm : FormGroup;
  private error:string;
  private loader:any;
  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private acountServ:AcountService,
    public alertController: AlertController,
    private nav:NavController) { }

  ngOnInit() {
    this.ngForm = this.formBuilder.group({
      nomBanque: ['', [Validators.required,Validators.pattern('[A-Za-z]+')]],
      solde: ['', [Validators.required,Validators.pattern('[0-9]+(.)[0-9]{1,3}|[0-9]+')]],
      numAcount: ['', Validators.required],
      typeAcount:['', [Validators.required]]
    });
    this.error=null;
  }
  resetError(){
    this.error=null;
  }
  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: 'Loading',
      duration: 1000
    });
    await this.loader.present();
  }

  dismissLoading(){
    this.loader.dismiss();
  }
  submit(){
    this.presentLoading()
    this.acountServ.addAcount(this.ngForm.value).then(a=>{
      this.presentAlertConfirm()
    },
    e=>this.error=e.message)
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Acount created',
      message: 'Do you want to create another acount ?',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
            this.nav.back()
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.ngForm.reset()
          }
        }
      ]
    });
    await alert.present();
  }
}
