import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckoutComponent implements OnInit {
  public checkoutDetails:any;
  public auctionList:any=[];
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Check out:: Yayaati');
    this.auctionCheckout(localStorage.getItem("checkoutId"), localStorage.getItem("userId"))
  }
  auctionCheckout(auctionId, ckoUserId){
    this.apiSrv.auctionCheckout(auctionId, ckoUserId).subscribe(
      (data) => {
        this.checkoutDetails = data;
        console.log(this.checkoutDetails);
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }


  
}