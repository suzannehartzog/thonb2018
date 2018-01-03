import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';


@Injectable()
export class ApiDataService {

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  constructor(
    private http: Http,
    private router: Router
  ) { }

  public ENV_URL_SEARCH = 'https://yayaati.herokuapp.com/';

   public LOCAL_ENV_URL_SEARCH = 'http://pc326759:9999/';


  public getCities() {
    return this.http.get(this.ENV_URL_SEARCH + 'v1/search/getAllCities').map(
      (response) => response.json()
    );
  }
  public createItinerary(params) {
    //POST /v1/booking/createItinerary    
    return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/createItinerary', params).map( 
      (response) => {
        response.toString();
        if (response.status == 200) {
          //tempVar = response["_body"].substring(8);

        } else {
        }
      }
    );
  }

  public getResourcesForPackage(product) {
    //POST /v1/booking/getResourcesForPackage
    console.log(product);

    return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/getResourcesForPackage', product).map(
      (response) => {
        //return response.json();
        this.apiData.next(response);
        this.router.navigate(['create-package']);
      }
    );
  }

  public createPackage(product) {
    //POST /v1/booking/createPackage
    console.log(product);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/createPackage', product).map(
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

  public getAllHotelsByOnwer(ownerId) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(ownerId);
    return this.http.post(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/getAllHotelsByOnwer', body, options).map(
      (response) =>response.json()
    );    
  }
  public getHotelDtlByHotelId(hotelId) {
    let param = {hotelId: hotelId};
    return this.http.get(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/getHotelDtlByHotelId?hotelId='+hotelId).map(
      (response) => response.json()
    );
  }
  public roomTypeCapacity(hoteld) {//assets/service-json/hotel-room-type.json
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(hoteld);
    return this.http.post(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/roomTypeCapacity', body, options).map(
      (response) => response.json()
    );
  }
  public activeAuctions() {//assets/service-json/auction-list.json
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify('');
    return this.http.post(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/activeAuctions', body, options).map(
      (response) => response.json()
    );
  }
  public checkValidBidder() {
    return;
  }
  public getAvailableRoomsForBooking(hotelId, roomTypeName, roomCapacity, roomLockedFrom, roomLockedTill){
	
	/*let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = param;*/
    return this.http.get(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/getAvailableRoomsForBooking?hotelId='+hotelId+'&roomType='+roomTypeName+'&roomCapacity='+roomCapacity+'&bookingStartDate='+roomLockedFrom+'&bookingEndDate='+roomLockedTill).map(
      (response) => response.json()
    );
  }
  public createAuction(auctionObj) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(auctionObj);
    return this.http.post(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/createAuction', body, options).map(
      (response) => response.json()
    );
  }
  public createPromotion(promotionObj) {    
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(promotionObj);
    return this.http.post(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/createPromotion', body, options).map(
      (response) => response.json()
    );
  }
  public createFlashSale(flashSaleObj) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(flashSaleObj);
    return this.http.post(this.LOCAL_ENV_URL_SEARCH + 'v1/hotel/createFlashSale', body, options).map(
      (response) => response.json()
    );
  }

  public addToHotelHaggling(params) {
    console.log(params);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/addToHotelHaggling', params).map(
      (response) => {
        return response;
      }
    );
  }

  public getHotelHagglingDetailForUser(hagglingId) {
    //POST /v1/booking/getHotelHagglingDetailForUser
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(hagglingId);
    return this.http.post(this.ENV_URL_SEARCH + "v1/booking/getHotelHagglingDetailForUser", body, options).map(
      (response) => response.json()
    );
  }

  public getHotelHagglingDetailForOwner(hagglingId) {
    //POST /v1/booking/getHotelHagglingDetailForOwner
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(hagglingId);
    return this.http.post(this.ENV_URL_SEARCH + "v1/booking/getHotelHagglingDetailForOwner", body, options).map(
      (response) => response.json()
    );
  }
	
	public textSearch(searchQuery){
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		let param = {searchText: searchQuery};
		return this.http.post(this.ENV_URL_SEARCH + 'v1/search/textSearch', param, options).map(
			(response) =>response.json()
		);
	}

  public validateLogin(loginData){
    return this.http.get(this.ENV_URL_SEARCH + 'v1/user/login?userEmail='+ loginData.userEmail + "&userPwd=" + loginData.userPwd).map(
      (response) => response
    );
  }

  // public dummygetNotificationsPosts(){
  //   let param = {
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1
  //   };
  //   let headers = new Headers();
  //   this.createAuthorizationHeader(headers);     
  //   let options = new RequestOptions({headers: headers});
  //   return this.http.post('https://jsonplaceholder.typicode.com/posts', param, options).map(
  //     (response) =>response.json()
  //   );
  // }
}