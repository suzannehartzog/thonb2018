import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackage implements OnInit {

  public price:number;
  public noOfTravellers:number;
  public ownerUserId: number;
  public name: string;
  public countryId:number;
  
  public isHotelSelected: boolean = false;
  public isPickupSelected: boolean = false;
  public isDropSelected: boolean = false;
  public isGuideSelected: boolean = false;

  public hideHotelBodyPanel: boolean = false;
  public hidePickupBodyPanel: boolean = false;
  public hideDropBodyPanel: boolean = false;
  public hideGuideBodyPanel: boolean = false;

  public textSearchAll: any;
  public hotelInDate: string;
  public hotelLocation: string;
  public hotelOutDate: string;
  public pickUpFromLoc: string;
  public pickUpToLoc: string;
  public pickUpDate: string;
  public dropDate: string;
  public dropToLoc: string;
  public dropFromLoc: string;
  public guideDate: string;


  public allHotels: any[];
  public allGuides: any[];
  public pickUpTransports: any[];
  public dropTransports: any[];
  public createPackageJson: any;

  public message: string = "";
  public messageClass: string = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private http: Http,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {
    apiSrv.apiData$.subscribe(data => this.textSearchAll = data.json());
  }

  ngOnInit() {
    this.titleService.setTitle('Register Itinerary:: Yayaati');
    this.setLocalData();
  }

  public setLocalData() {
     //console.log(this.textSearchAll.json());

    this.price = parseInt(localStorage.getItem("price"));
    this.noOfTravellers = parseInt(localStorage.getItem("noOfTravellers"));
    this.ownerUserId = parseInt(localStorage.getItem("ownerUserId"));
    this.name = localStorage.getItem("name");
    this.countryId = parseInt(localStorage.getItem("countryId"))

    this.allHotels = this.apiSrv.getUniqueHotels(this.textSearchAll.hotels);
    this.pickUpTransports = this.textSearchAll.pickUpTransports;
    this.dropTransports = this.textSearchAll.dropTransports;
    this.allGuides = this.textSearchAll.guides;

    this.hotelInDate = this.textSearchAll.hotelInDate;
    this.hotelLocation = this.textSearchAll.hotelLocation;
    this.hotelOutDate = this.textSearchAll.hotelOutDate;
    this.pickUpFromLoc = this.textSearchAll.pickUpFromLoc;
    this.pickUpToLoc = this.textSearchAll.pickUpToLoc;
    this.guideDate = this.textSearchAll.guideDate;
    this.pickUpDate = this.textSearchAll.pickUpDate;
    this.dropToLoc = this.textSearchAll.dropToLoc;
    this.dropFromLoc = this.textSearchAll.dropFromLoc;
    this.dropDate = this.textSearchAll.dropDate;

    this.createPackageJson = {
      "countryId": this.countryId,
      "guides": [{}],      
      "price": this.price,
      "travellerCount": this.noOfTravellers,
      "ownerUserId": this.ownerUserId,
      "name": this.name
    }

    // if(this.pickUpTransports.length) {
    //   this.createPackageJson.pickUpTransports= [{}];
    // }

    // if(this.dropTransports.length) {
    //   this.createPackageJson.dropTransports= [{}];
    // }

    // if(this.allGuides.length) {
    //   this.createPackageJson.guides= [{}];
    // }
  }

  toggleDisplay(param) {
    switch(param) {
      case "hotel":
        console.log(param);
        this.hideHotelBodyPanel = !this.hideHotelBodyPanel;
        break;
      case "pickup":
        console.log(param);
        this.hidePickupBodyPanel = !this.hidePickupBodyPanel;
        break;
      case "drop":
        console.log(param);
        this.hideDropBodyPanel = !this.hideDropBodyPanel;
        break;
      case "guide":
        console.log(param);
        this.hideGuideBodyPanel = !this.hideGuideBodyPanel;
        break;
      default:
    } 
  } 

  public getTextSearchAll() {
    //console.log(this.apiSrv.ENV_URL_SEARCH); 
    // let body = JSON.stringify({ 'text': 'visit to darjeeling from 4jan to 9jan' });
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    // this.http.post(this.apiSrv.ENV_URL_SEARCH+'v1/search/textSearch',body, options).map(
    // //this.http.get("../../assets/service-json/register-itin.json").map(
    //   (response) => response
    // ).subscribe(
    //   res => {
    //     console.log(res.json());
    //     this.allHotels = this.apiSrv.getUniqueHotels(res.json().hotels);
    //     this.allGuides = res.json().guides;
    //     this.transports = res.json().transports;
    //   },
    //   (error) => console.log(error),
    //   () => {

    //   }
    //   );
  }

  showPickup(hotel, roomType) {
    //console.log(hotel);

    let hotelCheckInDate = document.getElementById("checkinDate").innerText;
    if (!this.isHotelSelected) {
      this.isHotelSelected = !this.isHotelSelected;
      this.hideHotelBodyPanel = true;
    } 
    
    if(!this.pickUpTransports.length) {
      this.isPickupSelected = true;
    } else if(this.dropTransports.length) {
      this.isDropSelected = true;
    } else if(this.allGuides.length) {
      this.isGuideSelected = true;
    }

    this.createPackageJson.hotels = [{
      "checkinDate": "2018-" + hotelCheckInDate.substr(0,2) +"-"+ this.shrSrv.getMon(hotelCheckInDate.substr(2,3)) + "T10:00:00.468Z",
      "hotelId": hotel.hotelId,
      "noOfNights": 3,
      "noOfRooms": 2,
      "roomType": roomType
    }];
    //console.log(this.createPackageJson);
  }

  showDrop(transport) {
    let transportDate= document.getElementById("pickupDate").innerText;
    if (!this.isPickupSelected) {
      this.isPickupSelected = !this.isPickupSelected;
      this.hidePickupBodyPanel = true;
    }

    if(this.pickUpTransports.length) {
      this.createPackageJson.pickUpTransports = [{
        "transportAssetId": transport.transportAssetId,
        "transportDate": "2018-" + transportDate.substr(0,2) +"-"+ this.shrSrv.getMon(transportDate.substr(2,3)) + "T06:02:07.468Z",
        "transportType": "C",
        "vehicleName": transport.vehicalName
      }];
    }

    if(!this.dropTransports.length) {
      this.isDropSelected = true;
    }
    if(!this.allGuides.length) {
      this.isGuideSelected = true;
    }
  }

  showGuide(transport) {
    let transportDate= document.getElementById("dropDate").innerText;
    if (!this.isDropSelected) {
      this.isDropSelected = !this.isDropSelected;
      this.hideDropBodyPanel = true;
    }

    if(this.dropTransports.length) {
      this.createPackageJson.dropTransports = [{
        "transportAssetId": transport.transportAssetId,
        "transportDate": "2018-" + transportDate.substr(0,2) +"-"+ this.shrSrv.getMon(transportDate.substr(2,3)) + "T06:02:07.468Z",
        "transportType": "C",
        "vehicleName": transport.vehicalName
      }];
    }
    if(this.allGuides.length) {
      this.isGuideSelected = true;
    }
    //console.log(this.createPackageJson);
  }

  addGuide(guide) {
    let guideDate= document.getElementById("guideDate").innerText;

    this.isGuideSelected = !this.isGuideSelected;
    this.hideGuideBodyPanel = true;

    if(this.allGuides.length) {
      this.createPackageJson.guides = [{  
        "guideDate": "2018-"+guideDate.substr(0,2)+"-"+this.shrSrv.getMon(guideDate.substr(2,3))+"T06:02:07.468Z",
        "guideId": guide.guideId
      }];
    }
    //console.log(this.createPackageJson);
  }

  createPackage() {
    this.apiSrv.createPackage(this.createPackageJson).subscribe(
      (data) => {
        this.messageClass = "alert alert-success";
        this.message = "Package successfully created!";

        $('.btn.btn-info').addClass('disabled');
        this.createPackageJson = {};
      }, (error) => {
        this.messageClass = "alert alert-danger";
        this.message = "Package registration failed!";
        console.log(error);
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
}