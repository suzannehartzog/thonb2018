import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})
export class CreateItineraryComponent implements OnInit {

  public itinParam: Object;
  public cityList;
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Create Itinerary:: Yayaati');

    this.apiSrv.getCities().subscribe(
      (res:Response) => {
        console.log(res);
        this.cityList = res;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed cityList")//Complete Handler
    );
  }

  getResourcesForPackage(params:any) {
    console.log(params);
    params.startingDate = params.startingDate + "T12:14:53.094Z"// " + params.startingTime;

    params.starttingCityId = parseInt(params.starttingCityId);
    params.travellingCityId = parseInt(params.travellingCityId);
    params.noOfNights = parseInt(params.noOfNights);
    params.noOfRooms = parseInt(params.noOfRooms);
    params.noOfTravellers = parseInt(params.noOfTravellers);

    if (params.pickUpIncluded == "") {
      params.pickUpIncluded = false;
    }
    if (params.dropIncluded == "") {
      params.dropIncluded = false;
    }
    if (params.guideIncluded == "") {
      params.guideIncluded = false;
    }

    localStorage.setItem("starttingCityId", params.starttingCityId);
    localStorage.setItem("startingDate", params.startingDate + params.startingTime);
    localStorage.setItem("travellingCityId", params.travellingCityId);
    localStorage.setItem("noOfNights", params.noOfNights);
    localStorage.setItem("noOfRooms", params.noOfRooms);
    localStorage.setItem("noOfTravellers", params.noOfTravellers);    
    localStorage.setItem("pickUpIncluded", params.pickUpIncluded);
    localStorage.setItem("guideIncluded", params.guideIncluded);
    localStorage.setItem("dropIncluded", params.dropIncluded);
    localStorage.setItem("price", params.budget);

    delete params.fromDate;
    delete params.startingTime;
    delete params.budget;
    
    this.apiSrv.getResourcesForPackage(params).subscribe(
      (data) => {
        console.log(data);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
}
