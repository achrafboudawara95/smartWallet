import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AcountService } from '../../sevices/AcountService'
import { snapshotToObject } from 'src/models/snapshotToObject';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  @Input() acountid: any;
  @Input() type: any;
  private buttondiabled=false;
  private trans=[]
  private ngForm : FormGroup;
  constructor(public modalController: ModalController,
    private formBuilder: FormBuilder,
    private acountServ:AcountService) { }

  ngOnInit() {
    this.ngForm = this.formBuilder.group({
      description: [""],
      solde:["", [Validators.required,Validators.pattern('[0-9]+(.)[0-9]{1,3}|[0-9]+')]]
    });
    this.acountServ.getTransactions(this.acountid.key).on('child_added',data=>{
      this.trans.unshift(snapshotToObject(data))
    })
  }

  async close(){
    await this.modalController.dismiss()
  }

  submit(){
    this.buttondiabled=true
    this.acountServ.addTransiction(this.acountid.key,this.ngForm.value,this.type).then(
      f=>{
        if(this.type=='add')
          this.acountid.solde=parseInt(this.acountid.solde)+parseInt(this.ngForm.value.solde)
        else
          this.acountid.solde=parseInt(this.acountid.solde)-parseInt(this.ngForm.value.solde)
        this.buttondiabled=false
        this.ngForm.reset()
      })
  }

}
