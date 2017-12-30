import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

 
@Injectable()
export class ApiDataService {    

  constructor(
    private http: Http
  ) {}

  public ENV_URL_BOOK = 'http://yayaati-yayaati.1d35.starter-us-east-1.openshiftapps.com/yayaati-1.0';
  
  public createItinerary(product){
    //POST /v1/booking/createItinerary    
    let params  = {
        product: product
    };
    let tempVar;
    return this.http.post(this.ENV_URL_BOOK + '/v1/booking/createItinerary   ', params).map(
      (response) =>{
        response.toString();
        if(response.status == 200) {
          tempVar = response["_body"].substring(8);

        } else {
          
        }
      }
    );
  }
}