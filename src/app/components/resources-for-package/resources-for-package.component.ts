import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-resources-for-package',
  templateUrl: './resources-for-package.component.html',
  styleUrls: ['./resources-for-package.component.css']
})
export class GetResourcesForPackage implements OnInit {

  public itinParam: Object;
  public cityList;
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Get Resources for Package:: Yayaati');
    
    this.apiSrv.getCities().subscribe(
      data => {
        this.cityList = data;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed cityList")//Complete Handler
    );
    //console.log(this.cityList)
  }

  getResourcesForPackage(params:any) {
    console.log(params);   
    
    // localStorage.setItem("originCityId", params.originCityId);
    // localStorage.setItem("fromDate", params.fromDate);
    // localStorage.setItem("destinationCityId", params.destinationCityId);
    // localStorage.setItem("nights", params.nights);
    // localStorage.setItem("rooms", params.rooms);
    // localStorage.setItem("groupSize", params.groupSize);    
    // localStorage.setItem("price", params.price);
    // localStorage.setItem("hotel", "true");
    // localStorage.setItem("pickup", params.pickup);
    // localStorage.setItem("guide", params.guide);
    
    
    this.apiSrv.getResourcesForPackage(params).subscribe(
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
