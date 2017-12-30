import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-e-auction',
  templateUrl: './e-auction.component.html',
  styleUrls: ['./e-auction.component.css' , './flexslider.css']
})
export class EAuctionComponent implements OnInit {
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
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.titleService.setTitle('E Auction:: Yayaati');
    this.auctionList = [
      {id:7, name:"Auction 7"},
      {id:8, name:"Auction 8"},
      {id:9, name:"Auction 9"},
      {id:10, name:"Auction 10"},
      {id:11, name:"Auction 11"},
      {id:12, name:"Auction 12"}
    ];
    setTimeout(()=>{ 
      this.startSlider();
    },100);    
  }
  toggleChild(auction){
    auction.showdetails = !auction.showdetails;
  }
  addToMyBids(auction){
    this.bids.unshift(auction);
    let index = this.auctionList.indexOf(auction);
    this.auctionList.splice(index, 1);
    setTimeout(()=>{   
      $('.flexslider').data('flexslider').addSlide();
      this.startSlider();
    },100);
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
    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: true,
      itemWidth: $(".flexslider").outerWidth()/3,
      itemMargin: 0,
      slideshow:false,
      touch: true,
      start: function(slider){
        $('body').removeClass('loading');
      }
    });
  }
}