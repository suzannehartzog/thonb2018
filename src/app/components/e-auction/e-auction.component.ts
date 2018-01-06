import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SlicePipe } from '@angular/common';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-e-auction',
  templateUrl: './e-auction.component.html',
  styleUrls: ['./e-auction.component.css']
})
export class EAuctionComponent implements OnInit {
  public hasError :boolean;
  public errorMsg: string;
  public loggedInUser :any;
  public bidList:any=[];
  public upcomingAuctions:any=[];
  public flashSale:any=[];
  public auctionList:any=[];
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef,    
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('E Auction:: Yayaati');
    this.loggedInUser = localStorage.getItem("userId");
    this.getActiveAuctions(localStorage.getItem("userId"));
    this.getmyActiveAuctions(localStorage.getItem("userId"));
    this.getactiveFlashSale();
    this.getupcomingAuctions();
  }
  getActiveAuctions(userId){
    this.apiSrv.activeAuctions(userId).subscribe(
      (data) => {
        this.auctionList = data;         
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
  getmyActiveAuctions(userId){
    this.apiSrv.myActiveAuctions(userId).subscribe(
      (data) => {
        this.bidList = data; 
        setTimeout(()=>{ 
          $('.flexslider').data('flexslider').addSlide();
          this.startSlider();
        },300);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
  getactiveFlashSale(){
    this.apiSrv.activeFlashSale().subscribe(
      (data) => {
        this.flashSale = data; 
        setTimeout(()=>{ 
          this.startSlider();
        },500);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
  getupcomingAuctions(){
    this.apiSrv.upcomingAuctions().subscribe(
      (data) => {
        this.upcomingAuctions = data; 
        setTimeout(()=>{ 
          this.startSlider();
        },500);
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
  checkValidBidder(auction, currentBid){
    let param ={
      "auctionId": auction.auctionId,
      "biddingPrice": auction.bidNowAt,
      "userId": this.loggedInUser
    }    
    this.apiSrv.checkValidBidder(param).subscribe(
      (data) => {
        if(data.validBidder){
          this.saveBid(auction);
        }else{
          console.log("Invalid");
          this.hasError = true;
          this.errorMsg = data.errorDesc;
        }        
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );    
  }
  saveBid(auction){
    let param = {
      "assetType": "H",
      "auctionId": auction.auctionId,
      "bidDate": "",
      "bidId": auction.bidId==undefined?0:auction.bidId,
      "bidPrice": auction.bidNowAt,
      "bidWin": "",
      "bidderId": localStorage.getItem("userId"),
      "eventType": "A"
    }
    this.apiSrv.saveBid(param).subscribe(
      (data) => {
        // this.bidList.unshift(auction);
        // let index = this.auctionList.indexOf(auction);
        // this.auctionList.splice(index, 1);
        this.getmyActiveAuctions(localStorage.getItem("userId"));        
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );   
  }
  auctionCheckout(auction){
    localStorage.setItem("checkoutId", auction.auctionId);
    this.router.navigate(['/check-out']);
  }  
  increasePrice(auction){
    if(auction.bidNowAt<auction.buyNowPrice){
      auction.bidNowAt = auction.bidNowAt+10;
    }    
  }
  decreasePrice(auction){
    if(auction.bidNowAt>auction.currentBidPrice){
      auction.bidNowAt = auction.bidNowAt-10;
    }
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
    $('.flex-flash-sell').flexslider({
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
    let itemWidth:number;
    if($(window).width() < 768){
      itemWidth = $(".flexslider").width()/1;
    }else if($(window).width() < 1024){
      itemWidth = $(".flexslider").width()/2;
    }else{
      itemWidth = $(".flexslider").width()/3;
    }
    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      itemWidth: itemWidth,
      itemMargin: 0,
      slideshow:false,
      touch: true,
      start: function(slider){
        $('body').removeClass('loading');
      }
    });
  }
}