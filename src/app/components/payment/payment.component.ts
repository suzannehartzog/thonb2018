import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public checkoutDetails:any;
  public paymentDetails:any;
  public showPaymentContent:boolean=false;
  public showPaymentSuccessContent:boolean=false;
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Payment :: Yayaati');
    this.auctionCheckout(localStorage.getItem("checkoutId"), localStorage.getItem("userId"))
  }
  auctionCheckout(auctionId, ckoUserId){
    this.apiSrv.auctionCheckout(auctionId, ckoUserId).subscribe(
      (data) => {
        this.checkoutDetails = data;
        this.showPaymentContent=true;
        console.log(this.checkoutDetails);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
  payNow(){
    let bookingRequestVo ={
      "auctionId": localStorage.getItem("checkoutId"),
      "userId": localStorage.getItem("userId")
    }
    this.apiSrv.doAuctionCheckOutBooking(bookingRequestVo).subscribe(
      (data) => {
        this.paymentDetails = data;
        this.showPaymentSuccessContent = true;
        this.showPaymentContent = false;
        console.log(this.paymentDetails);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
}