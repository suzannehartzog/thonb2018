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
  selector: 'app-register-itinerary',
  templateUrl: './register-itinerary.component.html',
  styleUrls: ['./register-itinerary.component.css']
})
export class RegisterItineraryComponent implements OnInit {
  public isHotelSelected: boolean = false;
  public isPickupSelected: boolean = false;
  public isDropSelected: boolean = false;
  public isGuideSelected: boolean = false;

  public hideHotelBodyPanel: boolean = false;
  public hidePickupBodyPanel: boolean = false;
  public hideDropBodyPanel: boolean = false;
  public hideGuideBodyPanel: boolean = false;

  public textSearchAll: any;
  public allHotels: any[];
  public allGuides: any[];
  public transports: any[];
  public createPackageJson: any;

  public message: string = "";
  public messageClass: string = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private http: Http,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Register Itinerary:: Yayaati');
    this.getTextSearchAll();

    this.createPackageJson = {
      "countryId": parseInt(localStorage.getItem("countryId")),
      "hotels": [{}],
      "guides": [{}],
      //"transports": [{}],
      "price": parseInt(localStorage.getItem("price")),
      "travellerCount": parseInt(localStorage.getItem("travellerCount")),
      "ownerUserId": parseInt(localStorage.getItem("ownerUserId")),
      "name": localStorage.getItem("name")
    }
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
    let body = JSON.stringify({ 'text': 'visit to darjeeling from 4jan to 9jan' });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(this.apiSrv.ENV_URL_SEARCH+'v1/search/textSearch',body, options).map(
    //this.http.get("../../assets/service-json/register-itin.json").map(
      (response) => response
    ).subscribe(
      res => {
        console.log(res.json());
        this.allHotels = this.apiSrv.getUniqueHotels(res.json().hotels);
        this.allGuides = res.json().guides;
        this.transports = res.json().transports;
      },
      (error) => console.log(error),
      () => {

      }
      );
  }

  showPickup(hotel, roomType) {
    //console.log(hotel);
    if (!this.isHotelSelected) {
      this.isHotelSelected = !this.isHotelSelected;
      this.hideHotelBodyPanel = true;
    }
    this.createPackageJson.hotels.pop();
    this.createPackageJson.hotels.push({
      "checkinDate": document.getElementById("checkinDate").innerText+"T06:02:07.468Z",
      "hotelId": hotel.hotelId,
      "noOfNights": 3,
      "noOfRooms": 2,
      "roomType": roomType
    });
    //console.log(this.createPackageJson);
  }

  showDrop(transport) {
    if (!this.isPickupSelected) {
      this.isPickupSelected = !this.isPickupSelected;
      this.hidePickupBodyPanel = true;
    }
  }

  showGuide(transport) {
    if (!this.isDropSelected) {
      this.isDropSelected = !this.isDropSelected;
      this.hideDropBodyPanel = true;
    }

    // console.log(this.createPackageJson);
    // this.createPackageJson.transports.pop();
    // this.createPackageJson.transports.push({
    //   "transportAssetId": transport.transportAssetId,
    //   "transportDate": "2018-01-04T06:02:07.468Z",
    //   "transportType": "C",
    //   "vehicleName": transport.vehicalName
    // });
    //console.log(this.createPackageJson);
  }

  addGuide(guide) {
    this.isGuideSelected = !this.isGuideSelected;
    this.hideGuideBodyPanel = true;

    this.createPackageJson.guides.pop();
    this.createPackageJson.guides.push({  
      "guideDate": document.getElementById("guideDate").innerText+"T06:02:07.468Z",
      "guideId": guide.guideId
    });
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
