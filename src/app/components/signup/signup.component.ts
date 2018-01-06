import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public defaultValue = {roomTypeName: null, roomCapacity:1}
  public hotelDetails = {};
  public hotelId: number;
  public roomTypeList:any=[];
  public roomCapacity:any=[];
  private sub: any;
  public showAuction: boolean = true;
  public showFlashSale: boolean = false;
  public showPromotions: boolean = false;
  public showHotelDetails: boolean = false;
  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('customer signup:: Yayaati');
  }
  toggleTab(tabnae) {
    this.showAuction = false;
    this.showFlashSale = false;
    this.showPromotions = false;
    this.showHotelDetails = false;
    if (tabnae === "auction") {
      this.showAuction = true;
    } else if (tabnae === "flashsale") {
      this.showFlashSale = true;
    } else if (tabnae === "promotions") {
      this.showPromotions = true;
    } else {
      this.showHotelDetails = true;
    }
  }
}
