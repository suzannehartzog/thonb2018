import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  public currentBid : number = 1500;
  public loggedInUser :any;
  public bids:any=[
    {id:1, name:"Auction 1"},
    {id:2, name:"Auction 2"},
    {id:3, name:"Auction 3"},
    {id:4, name:"Auction 4"},
    {id:5, name:"Auction 5"},
    {id:6, name:"Auction 6"}
  ];
  public upcomingAuctions:any=[
    {id:1, name:"Auction 1"},
    {id:2, name:"Auction 2"},
    {id:3, name:"Auction 3"},
    {id:4, name:"Auction 4"},
    {id:5, name:"Auction 5"},
    {id:6, name:"Auction 6"}
  ];
  public flashSells:any=[
    {id:1, name:"Auction 1"},
    {id:2, name:"Auction 2"},
    {id:3, name:"Auction 3"},
    {id:4, name:"Auction 4"},
    {id:5, name:"Auction 5"},
    {id:6, name:"Auction 6"}
  ];
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
    this.getActiveAuctions();        

  }
  getActiveAuctions(){
    this.apiSrv.activeAuctions().subscribe(
      (data) => {
        this.auctionList = data; 
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
  checkValidBidder(auction, currentBid){
    let param ={
      "auctionId": auction.auctionId,
      "biddingPrice": currentBid,
      "userId": this.loggedInUser
    }
    this.apiSrv.checkValidBidder(param).subscribe(
      (data) => {
        if(data.validBidder){
          console.log("Valid");
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
      "bidPrice": 5000,
      "bidWin": "",
      "bidderId": localStorage.getItem("userId"),
      "eventType": "A"
    }
    this.apiSrv.saveBid(param).subscribe(
      (data) => {
        this.bids.unshift(auction);
        let index = this.auctionList.indexOf(auction);
        this.auctionList.splice(index, 1);
        setTimeout(()=>{   
          $('.flexslider').data('flexslider').addSlide();
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
  auctionCheckout(auction){
    localStorage.setItem("checkoutId", auction.auctionId);
    this.router.navigate(['/check-out']);
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