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
  public description: string;
  public noOfTravellers:number;
  public userId: number;
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
  public showBtnContainer: boolean = false;

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
  public fromTime: string;


  public allHotels: any[];
  public allGuides: any[];
  public pickUpTransports: any[];
  public dropTransports: any[];
  public createPackageJson: any;

  public message: string = "";
  public messageClass: string = "";

  public getMyPackages: {};

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
    this.noOfTravellers = parseInt(localStorage.getItem("noOfTravellers"));
    this.userId = parseInt(localStorage.getItem("userId"));
    this.name = localStorage.getItem("userName");
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

    this.fromTime = localStorage.getItem("fromTime");

    this.createPackageJson = {
      "countryId": this.countryId,
      "guides": [{}],      
      "price": this.price,
      "travellerCount": this.noOfTravellers,
      "ownerUserId": this.userId,
      "name": this.name,
      "description": this.description,
      "transports": [{}],
      "pkgId": 0
    }

    this.apiSrv.getMyPackages(this.userId).subscribe(
      (res:Response) => {
        console.log(res);
        this.getMyPackages = res;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getMyPackages")//Complete Handler
    );
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

  showPickup(hotel, roomType, hotelLocation) {
    //console.log(hotel);

    let hotelCheckInDate = document.getElementById("checkinDate").innerText;
    if (!this.isHotelSelected) {
      this.isHotelSelected = !this.isHotelSelected;
      this.hideHotelBodyPanel = true;
    } 
    
    if(this.pickUpTransports.length) {
      this.isHotelSelected = true;
    }
    if(this.dropTransports.length) {
      this.isPickupSelected = true;
    }
     if(this.allGuides.length) {
      this.isGuideSelected = true;
    }

    this.createPackageJson.hotels = [{
      "checkinDate": "2018-" + hotelCheckInDate.substr(0,2) +"-"+ this.shrSrv.getMon(hotelCheckInDate.substr(2,3)) + " " + this.fromTime,
      "hotelId": parseInt(hotel.hotelId),
      "noOfNights": parseInt(localStorage.getItem("noOfNights")),
      "noOfRooms": parseInt(localStorage.getItem("noOfRooms")),
      "roomType": roomType,
      "hotelName": hotel.hotelName,
      "hotelAddress": hotelLocation
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
      this.createPackageJson.transports.pop();
      this.createPackageJson.transports.push({
        "transportAssetId": transport.transportAssetId,
        "transportDate": "2018-" + transportDate.substr(0,2) +"-"+ this.shrSrv.getMon(transportDate.substr(2,3)) + " " + this.fromTime,
        "transportType": "C",
        "vehicleName": transport.vehicalName
      });
    }

    if(!this.dropTransports.length) {
      this.isDropSelected = true;
    }
    if(!this.allGuides.length) {
      this.isDropSelected = true;
    }
  }

  showGuide(transport) {
    let transportDate= document.getElementById("dropDate").innerText;
    if (!this.isDropSelected) {
      this.isDropSelected = !this.isDropSelected;
      this.hideDropBodyPanel = true;
    }

    if(this.dropTransports.length) {
      if(this.createPackageJson.transports[0].transportAssetId == undefined) {
        this.createPackageJson.transports.pop();
      }
      this.createPackageJson.transports.push({
        "transportAssetId": transport.transportAssetId,
        "transportDate": "2018-" + transportDate.substr(0,2) +"-"+ this.shrSrv.getMon(transportDate.substr(2,3)) + " " + this.fromTime,
        "transportType": "C",
        "vehicleName": transport.vehicalName
      });
    }
    if(!this.allGuides.length) {
      this.isDropSelected = false;
      $(".budgetContainer,a.hideMe.form-control").removeClass("hideMe")
    }
    //console.log(this.createPackageJson);
  }

  addGuide(guide) {
    let guideDate= document.getElementById("guideDate").innerText;

    //this.isGuideSelected = !this.isGuideSelected;
    this.hideGuideBodyPanel = true;
    this.showBtnContainer = true;
    
    if(this.allGuides.length) {
      this.createPackageJson.guides = [{  
        "guideDate": "2018-"+guideDate.substr(0,2)+"-"+this.shrSrv.getMon(guideDate.substr(2,3)) + " " + this.fromTime,
        "guideId": guide.guideId,
        "guideName": guide.userName
      }];
    }
    //console.log(this.createPackageJson);
  }

  createPackage() {
    this.description = (<HTMLInputElement>document.getElementById("description")).value;
    
    this.createPackageJson.description= this.description;

    if(this.createPackageJson.transports[0].transportAssetId == undefined) {
      this.createPackageJson.transports.pop();
    }

    if(this.createPackageJson.guides.guideId == undefined) {
      this.createPackageJson.guides.pop();
    }
    
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
