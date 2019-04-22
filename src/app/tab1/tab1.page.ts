import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AcountService } from 'src/sevices/AcountService';
import { snapshotToObject } from '../../models/snapshotToObject'
import { NavParamService } from '../../sevices/NavParamsService'
import { MembersPage } from '../members/members.page'
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  private acounts=[]
  constructor(private nav:NavController,
    private acountServ:AcountService,
    public modalController: ModalController,
    private navparam:NavParamService){
  }

  public ngOnInit(): void {
    this.acounts=[]
    this.acountServ.getUserAcounts().on("child_added", data => {      
      this.acounts.push(snapshotToObject(data))
    });
    this.acountServ.getUserAcounts().on("child_changed", data => {
      data=snapshotToObject(data);
      let index=this.acounts.findIndex(function(element) {
        return element.key==data.key;
      });
      this.acounts[index]=data;
    });
  }

  addAcount(){
    this.nav.navigateForward('add-acount')
  }

  editAcount(item){
    this.navparam.param=item
    this.nav.navigateForward('edit-acount')
  }

  async addMoney(item){
    const modal = await this.modalController.create({
      component: MembersPage,
      componentProps: { acountid:item,type:'add'  }
    });
    
    return await modal.present();
  }

  async subMoney(item){
    const modal = await this.modalController.create({
      component: MembersPage,
      componentProps: { acountid:item,type:'subtract'  }
    });
    return await modal.present();
  }
}
