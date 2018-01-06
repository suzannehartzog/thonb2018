import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})
export class CreateItineraryComponent implements OnInit {

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

  submitItinerary(params: any) {
    console.log(params);   

    params.fromDate = params.fromDate + " " + params.fromTime;

    params.originCityId = parseInt(params.originCityId);
    params.destinationCityId = parseInt(params.destinationCityId);
    params.toDate = params.toDate + " " + params.toTime;
    params.expectedResponseWithin = params.expectedResponseWithinDate + " " + params.expectedResponseWithinTime;
    params.groupSize = parseInt(params.groupSize);
    params.budget = parseInt(params.budget);
    params.userId = parseInt(localStorage.getItem("userId"));

    if (params.hotel == "") {
      params.hotel = false;
    }
    if (params.transport == "") {
      params.transport = false;
    }
    if (params.guide == "") {
      params.guide = false;
    }

    delete params.fromTime;
    delete params.toTime;
    delete params.expectedResponseWithinDate;
    delete params.expectedResponseWithinTime;
    
    this.apiSrv.createItinerary(params).subscribe(
      (data) => {
        this.messageClass = "alert alert-success";
        this.message = "Your request has been placed. Agents will contact you soon.";
        //$('.btn.btn-info').addClass('disabled');        
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
