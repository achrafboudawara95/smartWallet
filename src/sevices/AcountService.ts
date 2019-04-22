import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AuthService } from './AuthService'

@Injectable({
    providedIn: 'root'
})

export class AcountService {
    private database = firebase.database();
    constructor(private authServ:AuthService){
    }

    addAcount(data){
        return this.database.ref('acounts/'+this.authServ.authUser.id).push().set({
            nomBanque:data.nomBanque,
            solde:data.solde,
            numAcount:data.numAcount,
            typeAcount:data.typeAcount,
            transections:[
                {solde:data.solde,
                type:'add',
                description:'initialisation Compte',
                dateInsert:new Date()}
            ]
        })
    }

    editAcount(idAcount,data){
        return this.database.ref('acounts/'+this.authServ.authUser.id+'/'+idAcount).update({
            nomBanque:data.nomBanque,
            numAcount:data.numAcount,
            typeAcount:data.typeAcount
        })
    }
    getUserAcounts(){
        return this.database.ref('acounts/'+this.authServ.authUser.id)
    }
    getTransactions(acountid){
        return this.database.ref('acounts/'+this.authServ.authUser.id+'/'+acountid+'/transections')
    }

    async addTransiction(acountid,data,type){
        let ref=this.database.ref('acounts/'+this.authServ.authUser.id+'/'+acountid)
        let sold;
        await ref.once('value',async a=>{
            sold=parseFloat(a.val().solde)
            if(type=='add')
                sold+=parseFloat(data.solde)
            else
                sold-=parseFloat(data.solde)
            await ref.update({
                solde:sold
            }).then(async a=>{
                ref=this.database.ref('acounts/'+this.authServ.authUser.id+'/'+acountid+'/transections')
                let pushed=ref.push()
                return await pushed.set({
                solde:data.solde,
                type:type,
                description:data.description,
                dateInsert:new Date().getTime()
                })
            })
        })
    }
}
