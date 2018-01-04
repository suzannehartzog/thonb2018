import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    public isLoggedIn;

    constructor(
        private router: Router
    ) { }

    canActivate() {
        console.log('i am checking to see if you are logged in');
        this.isLoggedIn = ((localStorage.getItem("isloggedIn") == '' || localStorage.getItem("isloggedIn") === null) ? false : true);
        if (!this.isLoggedIn) {
            this.router.navigate(['signin']);
        }
        return true;
    }
}