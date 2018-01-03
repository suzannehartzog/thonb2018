import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {ApiDataService} from '../../services/api-data.service';
import {SharedService} from '../../services/shared.service';
import { RouterModule, Router } from '@angular/router';
import { NavComponent } from '../shared/navbar/navbar.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-signout',
  template: '',
})
export class SignoutComponent implements OnInit {
  constructor(
    private router : Router
  ){    
    localStorage.clear();
    NavComponent.updateUserStatus.next(true); // here!
    console.log(localStorage.getItem('isLoggedIn'));
    this.router.navigate(['signin']);
  }

  ngOnInit() {
    // if(localStorage.getItem("token")!=='' || localStorage.getItem("token")!==null) {
    //   localStorage.removeItem('token');
    //   this.router.navigate(['']);
    // }
  }
}
