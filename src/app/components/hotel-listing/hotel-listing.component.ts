import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {
  public ownerId:number = 1;
  public hotelList:any=[];
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Hotel Listing:: Yayaati');
    this.getAllHotelsByOnwer();
  }  
  getAllHotelsByOnwer() {
    //console.log(params);   
    //localStorage.setItem("originCityId", params.originCityId);
    this.apiSrv.getAllHotelsByOnwer(this.ownerId).subscribe(
      (data) => {
        console.log(data);
        this.hotelList = data; 
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
}