import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FieldErrorDisplayComponent } from '../display-error/field-error-display.component';
import { NavComponent } from '../shared/navbar/navbar.component';
import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';
import { RouterModule, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userLogin: FormGroup;
  errDisplay: FieldErrorDisplayComponent;
  isloggedIn: boolean = false;
  loginMessage: string;

  constructor(
    private fb: FormBuilder,
    private http: Http,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService,
    private router: Router,
    private titleService: Title
  ) { // <--- inject FormBuilder
    this.createForm();
    this.titleService.setTitle('Sign In:: Yayaati');
  }

  ngOnInit() {
  }

  createForm() {
    this.userLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.userLogin.valid) {
      const loginData = {
        userEmail: this.userLogin.value.email,
        userPwd: this.userLogin.value.password
      };
      this.apiSrv.validateLogin(loginData).subscribe(
        (data) => {
          if (data.status == 200) {
            //debugger;
            let tempVar = JSON.parse(data["_body"]);
            if (tempVar.userId === "") {
              this.isloggedIn = false;
              this.loginMessage = "Login failed";
            } else {
              this.isloggedIn = true;
              window.localStorage.setItem('isloggedIn', 'true');
              NavComponent.updateUserStatus.next(true);

              window.localStorage.setItem("userId", tempVar.userId);
              window.localStorage.setItem("roleId", tempVar.roleId);
              window.localStorage.setItem("roleName", tempVar.roleName);
              window.localStorage.setItem("participateBuddy", tempVar.participateBuddy);
              window.localStorage.setItem("userName", tempVar.userName);
              window.localStorage.setItem("userAddress", tempVar.userAddress);
              window.localStorage.setItem("userDob", tempVar.userDob);
              window.localStorage.setItem("userKey", tempVar.userKey);
              window.localStorage.setItem("userMobile", tempVar.userMobile);
              window.localStorage.setItem("userAltMobile", tempVar.userAltMobile);
              window.localStorage.setItem("userEmail", tempVar.userEmail);
              window.localStorage.setItem("userZipcode", tempVar.userZipcode);
              window.localStorage.setItem("userActive", tempVar.userActive);
              window.localStorage.setItem("countryId", tempVar.countryId);
              window.localStorage.setItem("stateId", tempVar.stateId);
              window.localStorage.setItem("cityId", tempVar.cityId);

              window.localStorage.setItem("countryName", "india");

              window.localStorage.setItem("itineraryId", "1");    

              this.router.navigate(['']);
            }
          }
        },
        (error) => { },
        () => {
          console.log("completed validateLogin");
        }
      );
    } else {
      Object.keys(this.userLogin.controls).forEach(field => {
        const control = this.userLogin.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          //this.errDisplay(control);
        }
      });
    }
  }

  isFieldValid(field: string) {
    return !this.userLogin.get(field).valid && this.userLogin.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
}
