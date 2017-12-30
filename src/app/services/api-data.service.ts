import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiDataService {

  constructor(
    private http: Http
  ) { }

  public ENV_URL_SEARCH = 'https://yayaati.herokuapp.com/';

  public createItinerary(product) {
    //POST /v1/booking/createItinerary    
    let params = {
      product: product
    };
    let tempVar;
    return this.http.post(this.ENV_URL_SEARCH + '/v1/booking/createItinerary', params).map(
      (response) => {
        response.toString();
        if (response.status == 200) {
          //tempVar = response["_body"].substring(8);

        } else {

        }
      }
    );
  }

  public createPackage(product) {
    //POST /v1/booking/createPackage
    console.log(product);
    return this.http.post(this.ENV_URL_SEARCH + '/v1/booking/createPackage', product).map(
      (response) => {
        return response;
      }
    );
  }

  public getUniqueHotels(hotelArray) {
    let hotelGroups = {};
    for (var i = 0; i < hotelArray.length; i++) {
      let hotelId = hotelArray[i].hotelId;
      if (!hotelGroups[hotelId]) {
        hotelGroups[hotelId] = [];
      }
      hotelGroups[hotelId].push(hotelArray[i]);
    }
    hotelArray = [];
    for (var hotelId in hotelGroups) {
      hotelArray.push({ hotelId: hotelId, hotelName: hotelGroups[hotelId][0].hotelName, hotelClass: hotelGroups[hotelId] });
    }

    //console.log(hotelArray);

    return hotelArray;
  }
}