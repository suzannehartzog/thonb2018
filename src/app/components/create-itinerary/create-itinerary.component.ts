import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DatePicker } from '../../directives/datepicker/datepicker';
import { DateTimePicker } from '../../directives/datetimepicker/datetimepicker';
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
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Create Itinerary:: Yayaati');
  }

  submitItinerary(params:any) {
    console.log(params);   
    
    localStorage.setItem("originCityId", params.originCityId);
    localStorage.setItem("fromDate", params.fromDate);
    localStorage.setItem("destinationCityId", params.destinationCityId);
    localStorage.setItem("nights", params.nights);
    localStorage.setItem("rooms", params.rooms);
    localStorage.setItem("groupSize", params.groupSize);    
    localStorage.setItem("price", params.price);
    localStorage.setItem("hotel", "true");
    localStorage.setItem("pickup", params.pickup);
    localStorage.setItem("guide", params.guide);
    
    
    this.apiSrv.createItinerary(params).subscribe(
      (data) => {
        
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
}
