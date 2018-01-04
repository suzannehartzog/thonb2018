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
            let tempVar = JSON.parse(data["_body"]);
            if (tempVar.userId === "") {
              this.isloggedIn = false;
              this.loginMessage = "Login failed";
            } else {
              this.isloggedIn = true;
              localStorage.setItem('isloggedIn', 'true');
              NavComponent.updateUserStatus.next(true);

              localStorage.setItem("userId", tempVar.userId);
              localStorage.setItem("roleId", tempVar.roleId);
              localStorage.setItem("roleName", tempVar.roleName);
              localStorage.setItem("participateBuddy", tempVar.participateBuddy);
              localStorage.setItem("userName", tempVar.userName);
              localStorage.setItem("userAddress", tempVar.userAddress);
              localStorage.setItem("userDob", tempVar.userDob);
              localStorage.setItem("userKey", tempVar.userKey);
              localStorage.setItem("userMobile", tempVar.userMobile);
              localStorage.setItem("userAltMobile", tempVar.userAltMobile);
              localStorage.setItem("userEmail", tempVar.userEmail);
              localStorage.setItem("userZipcode", tempVar.userZipcode);
              localStorage.setItem("userActive", tempVar.userActive);
              localStorage.setItem("countryId", tempVar.countryId);
              localStorage.setItem("stateId", tempVar.stateId);
              localStorage.setItem("cityId", tempVar.cityId);

              localStorage.setItem("countryName", "india");

              localStorage.setItem("itineraryId", "1");    

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
