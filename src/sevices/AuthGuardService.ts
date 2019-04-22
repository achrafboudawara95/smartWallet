import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,private authServ:AuthService) {

    }

    canActivate(): boolean {

        let authInfo = {
            authenticated: this.authServ.isAuthenticated()
        };

        if (!authInfo.authenticated) {
            this.router.navigate(['login']);
            return false;
        }

        return true;

    }

}