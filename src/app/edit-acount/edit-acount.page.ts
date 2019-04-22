import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AcountService } from '../../sevices/AcountService'
import { NavParamService } from '../../sevices/NavParamsService'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-acount',
  templateUrl: './edit-acount.page.html',
  styleUrls: ['./edit-acount.page.scss'],
})
export class EditAcountPage implements OnInit {
  private ngForm : FormGroup;
  private error:string;
  private acount;
  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private acountServ:AcountService,
    private nav:NavController,
    private navparam:NavParamService) { }

  ngOnInit() {
    this.acount=this.navparam.param;
    this.navparam.param=null
    this.ngForm = this.formBuilder.group({
      nomBanque: [this.acount.nomBanque, [Validators.required,Validators.pattern('[A-Za-z]+')]],
      numAcount: [this.acount.numAcount, Validators.required],
      typeAcount:[this.acount.typeAcount, Validators.required]
    });
    this.error=null;
  }
  resetError(){
    this.error=null;
  }

  submit(){
    this.acountServ.editAcount(this.acount.key,this.ngForm.value).then(a=>{this.nav.navigateRoot('/tabs/acounts')},
    e=>this.error=e.message)
  }

}
