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
  //'https://yayaati.herokuapp.com/';
  public ENV_URL_SEARCH = 'https://yayaati.herokuapp.com/';

   //public LOCAL_ENV_URL_SEARCH = 'http://pc326759:9999/';


  public getCities() {
    return this.http.get(this.ENV_URL_SEARCH + 'v1/search/getAllCities').map(
      (response) => response.json()
    );
  }

  public getMyPackages(userId) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(userId);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/getMyPackages', body, options).map(
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
        if(response.json().hotels.length === 0) {          
          return response.json();
        } else {
          this.apiData.next(response);
        }
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
    return this.http.post(this.ENV_URL_SEARCH + 'v1/hotel/getAllHotelsByOnwer', body, options).map(
      (response) =>response.json()
    );    
  }
  public getHotelDtlByHotelId(hotelId) {
    let param = {hotelId: hotelId};
    return this.http.get(this.ENV_URL_SEARCH + 'v1/hotel/getHotelDtlByHotelId?hotelId='+hotelId).map(
      (response) => response.json()
    );
  }
  public roomTypeCapacity(hotelId) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(hotelId);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/hotel/roomTypeCapacity', body, options).map(
      (response) => response.json()
    );
  }
   public activeAuctions(userId) {//assets/service-json/auction-list.json
    return this.http.get(this.ENV_URL_SEARCH + 'v1/hotel/activeAuctions?bidderId='+userId).map(
      (response) => response.json()
    );
  }
  public myActiveAuctions(userId) {//assets/service-json/auction-list.json
    return this.http.get(this.ENV_URL_SEARCH + 'v1/hotel/myActiveAuctions?bidderId='+userId).map(
      (response) => response.json()
    );
  }
  public activeFlashSale() {//assets/service-json/auction-list.json
    return this.http.get(this.ENV_URL_SEARCH + 'v1/hotel/activeFlashSale').map(
      (response) => response.json()
    );
  }
  public upcomingAuctions() {//assets/service-json/auction-list.json
    return this.http.get(this.ENV_URL_SEARCH + 'v1/hotel/upcomingAuctions').map(
      (response) => response.json()
    );
  }
  public checkValidBidder(param) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(param);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/bid/checkValidBidder', body, options).map(
      (response) => response.json()
    );
  }
  public saveBid(auction) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(auction);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/bid/saveBid', body, options).map(
      (response) => response.json()
    );
  }
  // public auctionCheckout(auction){
  //   let headers = new Headers({ 'Content-Type': 'application/json'});
  //   let options = new RequestOptions({ headers: headers });
  //   let body = JSON.stringify(auction);
  //   return this.http.post(this.ENV_URL_SEARCH + 'v1/bid/auctionCheckout', body, options).map(
  //     (response) => response.json()
  //   );
  // }  
  public getAvailableRoomsForBooking(param){	
	  let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = param;
    return this.http.post(this.ENV_URL_SEARCH + 'v1/hotel/getAvailableRoomsForBooking', param, options).map(
      (response) => response.json()
    );
  }
  public createAuction(auctionObj) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(auctionObj);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/hotel/createAuction', body, options).map(
      (response) => response.json()
    );
  }
  public createPromotion(promotionObj) {    
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(promotionObj);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/hotel/createPromotion', body, options).map(
      (response) => response.json()
    );
  }
  public createFlashSale(flashSaleObj) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(flashSaleObj);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/hotel/createFlashSale', body, options).map(
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

  public getHotelHagglingDetail(hagglingId) {
    //POST /v1/booking/getHotelHagglingDetailForUser
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(hagglingId);
    return this.http.post(this.ENV_URL_SEARCH + "v1/booking/getHotelHagglingDetail", body, options).map(
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
  public getAllnotification(userId){
    return this.http.get(this.ENV_URL_SEARCH + 'v1/notification/getAll/'+userId).map(
      (response) => response.json()
    );
  }
  public markAllNotificationRead(userId){
    return this.http.get(this.ENV_URL_SEARCH + 'v1/notification/markAllNotificationRead/'+userId).map(
      (response) => response.json()
    );
  }
  public validateLogin(loginData){
    return this.http.get(this.ENV_URL_SEARCH + 'v1/user/login?userEmail='+ loginData.userEmail + "&userPwd=" + loginData.userPwd).map(
      (response) => response
    );
  }
  public flightSearch(params){
    console.log(params);
    let diff:any;
    let days:any;
    let flightURL = "http://flightfaresearch-smmas-del-cts.us-east-1.elasticbeanstalk.com:8080/cts-th-fltsrch/flight/getFlightFare?Origin=" + params.origin + "&Destination=" + params.destination + "&PointOfSaleCountryCode=US";
    if (params.returnDate != "" && params.tripType == "round") {
      flightURL = flightURL + "&ReturneDt=" +  params.returnDate;
      diff = new Date(params.returnDate - params.startDate);
      let str = new Date(params.startDate);
      let ret = new Date(params.returnDate);
      let timeDiff = Math.abs(ret.getTime() - str.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      flightURL = flightURL + "&LengthOfStaty" + diffDays;
    }
    if (params.flexiSearch == "1") {
      flightURL = flightURL + "&DepartureDt=" + params.startDate;
    }
    console.log("URL:" + flightURL);
    return this.http.get(flightURL).map(
      (response) => response.json()
    );
  }

  public showItineraryRequests() {
    return this.http.get(this.ENV_URL_SEARCH + '/v1/booking/showItineraryRequests').map(
      (response) => response.json()
    );
  }

  public respondToCreateItineraryRequest(product) {
    //POST /v1/booking/respondToCreateItineraryRequest
    console.log(product);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/respondToCreateItineraryRequest', product).map(
      (response) => {
        return response;
      }
    );
  }

  public retrievePackageDetails(params) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(params);
    return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/getMyPackages', body, options).map(
      (response) => response.json()
    );
  }
  public doAuctionCheckOutBooking(bookingRequestVo) {
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(bookingRequestVo);
      return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/doAuctionCheckOutBooking', body, options).map(
        (response) => response.json()
      );
    }
    public getHotelBookingCalander(param) {
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(param);
      return this.http.post(this.ENV_URL_SEARCH + 'v1/booking/getHotelBookingCalander', body, options).map(
        (response) => response.json()
      );
    }

   public auctionCheckout(auctionId, ckoUserId){
     return this.http.get(this.ENV_URL_SEARCH + 'v1/bid/auctionCheckout?auctionId='+auctionId+'&ckoUserId='+ckoUserId).map(
       (response) => response.json()
     );
   }
  
  public getMyHagglings(userId){
     return this.http.get(this.ENV_URL_SEARCH + 'v1/booking/getMyHagglings/'+userId).map(
       (response) => response.json()
     );
   }

   public getMyItnResponses(userId) {
     return this.http.get(this.ENV_URL_SEARCH + 'v1/booking/getMyItnResponses/'+userId).map(
       (response) => response.json()
     );
   }

   public getHotelAuctionsCreatedByHotelOwner(userId){
     return this.http.get(this.ENV_URL_SEARCH + '/v1/hotel/getHotelAuctionsCreatedByHotelOwner?hotelOwnerId='+userId).map(
       (response) => response.json()
     );
   }

   public filterHotels(params) {
     return this.http.post(this.ENV_URL_SEARCH + 'v1/search/filterHotels', params).map(
       (response) => response.json()
     );
   }

   public getWalletBalance(userId) {
     return this.http.get(this.ENV_URL_SEARCH + 'v1/user/getWalletBalance?userId='+userId).map(
       (response) => response.json()
     );
   }
}