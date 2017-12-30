import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiDataService } from '../services/api-data.service';

@Injectable()
export class SharedService {

  constructor(
    private apiSrv: ApiDataService
  ){
    this.apiSrv = apiSrv;
  }
}
