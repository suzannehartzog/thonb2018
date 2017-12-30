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
    localStorage.setItem("name", "tapa");
    localStorage.setItem("itineraryId", "1");
  }
}
