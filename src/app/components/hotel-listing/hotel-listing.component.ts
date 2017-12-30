import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-hotel-listing',
  templateUrl: './hotel-listing.component.html',
  styleUrls: ['./hotel-listing.component.css']
})
export class HotelListingComponent implements OnInit {
  public numbers:any=[1,2,3,4,5,6];
  public auctionList:any=[];
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Hotel Listing:: Yayaati');
    
  }  
}