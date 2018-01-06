import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-upcoming-auctions',
  templateUrl: './upcoming-auctions.component.html',
  styleUrls: ['./upcoming-auctions.component.css']
})
export class UpcomingAuctionsComponent implements OnInit {  
  public flashSaleList:any=[];
  public upcomingAuctions:any=[];
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef,    
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Upcoming Auctions :: Yayaati');
    this.getupcomingAuctions();  
    this.getActiveFlashSale();        
  }
  getActiveFlashSale(){
    this.apiSrv.activeFlashSale().subscribe(
      (data) => {
        this.flashSaleList = data; 
        setTimeout(()=>{ 
          this.startSlider();
        },200);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
      }
    );
  }
  getupcomingAuctions(){
    this.apiSrv.upcomingAuctions().subscribe(
      (data) => {
        this.upcomingAuctions = data; 
        setTimeout(()=>{ 
          this.startSlider();
        },300);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
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