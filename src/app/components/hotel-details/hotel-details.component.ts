import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  public showAuction: boolean = false;
  public showFlashSell: boolean = false;
  public showPromotions: boolean = false;
  public showHotelDetails: boolean = false;
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Hotel Details:: Yayaati');
  }
  toggleTab(tabnae){
    this.showAuction  = false;
    this.showFlashSell = false;
    this.showPromotions = false;
    this.showHotelDetails = false;
    if(tabnae==="auction"){
      this.showAuction  = true;
    }else if(tabnae==="flashsell"){
      this.showFlashSell  = true;
    }else if(tabnae==="promotions"){
      this.showPromotions  = true;
    }else{
      this.showHotelDetails  = true;
    }
  }  
}