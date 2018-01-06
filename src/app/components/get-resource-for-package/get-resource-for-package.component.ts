import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-get-resource-for-package.component',
  templateUrl: './get-resource-for-package.component.html',
  styleUrls: ['./get-resource-for-package.component.css']
})
export class GetResourceForPackage implements OnInit {

  public itinParam: Object;
  public cityList;
  public message: string = "";
  public messageClass: string = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Create Your Package:: Yayaati');

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
    params.startingDateTime = params.fromDate + " " + params.fromTime;

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
    localStorage.setItem("startingDate", params.fromDate + params.fromTime);
    localStorage.setItem("fromTime", params.fromTime);
    localStorage.setItem("travellingCityId", params.travellingCityId);
    localStorage.setItem("noOfNights", params.noOfNights);
    localStorage.setItem("noOfRooms", params.noOfRooms);
    localStorage.setItem("noOfTravellers", params.noOfTravellers);    
    localStorage.setItem("pickUpIncluded", params.pickUpIncluded);
    localStorage.setItem("guideIncluded", params.guideIncluded);
    localStorage.setItem("dropIncluded", params.dropIncluded);
    localStorage.setItem("price", params.budget);

    delete params.fromTime;
    delete params.budget;
    delete params.fromDate;
    
    this.apiSrv.getResourcesForPackage(params).subscribe(
      (data) => {
        console.log(data);
        this.messageClass = "alert alert-danger";
        this.message = "Sorry! No hotel found for this location.";
      }, (error) => {        
        //console.log(error); 
      },
      () => {
        console.log("completed getResourcesForPackage");
      }
    );
  }
}
