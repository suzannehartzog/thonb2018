import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DatePicker } from '../../directives/datepicker/datepicker';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.component.html',
  styleUrls: ['./quote-request.component.css']
})
export class QuoteRequestComponent implements OnInit {

  public cityList: Object;
  public message: string = "";
  public messageClass: string = "";
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Quote Request:: Yayaati');

    this.apiSrv.getCities().subscribe(
      (res:Response) => {
        console.log(res);
        this.cityList = res;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed cityList")//Complete Handler
    );
  }


  createItinerary(params:any) {
    console.log(params);    
    params.budget = parseInt(params.budget);
    params.destinationCityId = parseInt(params.destinationCityId);
    params.expectedResponseWithin = params.expectedResponseWithinDate + "T16:52:28.244Z";//" " + params.expectedResponseWithinTime;
    params.fromDate = params.fromDate + "T16:52:28.244Z"; //" " + params.fromTime;
    params.groupSize = parseInt(params.groupSize);
    params.originCityId = parseInt(params.originCityId);
    params.toDate = params.toDate +  "T16:52:28.244Z";//" " + params.toTime;
    params.userId = parseInt(localStorage.getItem("userId"));

    
    delete params.fromTime;
    delete params.expectedResponseWithinDate;
    delete params.expectedResponseWithinTime;
    delete params.toTime;

    if (params.transport == "") {
      params.transport = false;
    }
    if (params.hotel == "") {
      params.hotel = false;
    }
    if (params.guide == "") {
      params.guide   = false;
    }

    this.apiSrv.createItinerary(params).subscribe(
      (data) => {
        //console.log(data);

        this.messageClass = "alert alert-success";
        this.message = "Itinerary successfully created!";

        $('.btn.btn-info').addClass('disabled');
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed createItinerary");
      }
    );
  }
}
