import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public numbers:any=[1,2,3,4,5,6];
  public auctionList:any=[];
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Payments:: Yayaati');
    this.auctionList = [
      {id:1, name:"Auction 1"},
      {id:2, name:"Auction 2"},
      {id:3, name:"Auction 3"},
      {id:4, name:"Auction 4"},
      {id:5, name:"Auction 5"},
      {id:6, name:"Auction 6"}
    ];
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.startSlider();
    },100);    
  }
  toggleChild(auction){
    auction.showdetails = !auction.showdetails;
  }
  startSlider() {
      $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        itemWidth: $(".flexslider").outerWidth()/3,
        itemMargin: 0,
        slideshow:false,
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
  }
}