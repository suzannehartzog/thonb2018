import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiDataService } from '../services/api-data.service';

@Injectable()
export class SharedService {

  constructor(
    private apiSrv: ApiDataService
  ) {
    this.apiSrv = apiSrv;
    localStorage.setItem("countryId", "1");
    localStorage.setItem("countryName", "india");
    localStorage.setItem("createdBy", "tapa");
    localStorage.setItem("description", "tapa");
    localStorage.setItem("ownerUserId", "1");
    localStorage.setItem("userId", "1");
    localStorage.setItem("itineraryId", "1");

    localStorage.setItem("userType", "owner"); //TO BE CHANGED LATER AFTER INCORPORATION OFLOGIN!
  }
  public getMon(mon) {
    switch(mon) {
      case "Jan":
      case "jan":
        return "01";
      case "Feb":
      case "feb":
        return "02";
    }
  }
}
