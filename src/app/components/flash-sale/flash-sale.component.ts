import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-flash-sale',
  templateUrl: './flash-sale.component.html',
  styleUrls: ['./flash-sale.component.css']
})
export class FlashSaleComponent implements OnInit {  
  public flashSaleList:any=[];
  public upcomingAuctions:any=[
    {id:1, name:"Auction 1"},
    {id:2, name:"Auction 2"},
    {id:3, name:"Auction 3"},
    {id:4, name:"Auction 4"},
    {id:5, name:"Auction 5"},
    {id:6, name:"Auction 6"}
  ];
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef,    
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('E Auction:: Yayaati');
    this.getActiveFlashSale();        
  }
  getActiveFlashSale(){
    this.apiSrv.activeFlashSale().subscribe(
      (data) => {
        this.flashSaleList = data; 
        setTimeout(()=>{ 
          this.startSlider();
        },100);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
  toggleChild(auction){
    auction.showdetails = !auction.showdetails;
  }
  startSlider() {
    $('.flex-upcoming-auction').flexslider({
      animation: "slide",
      controlNav: false,
      directionNav: false,
      animationLoop: true,
      itemWidth: "100%",
      itemMargin: 0,
      slideshow: true, 
      slideshowSpeed: 4000,
      touch: true, 
      start: function(slider){
        $('body').removeClass('loading');
      }
    });
  }
}