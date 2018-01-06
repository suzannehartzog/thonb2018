import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {
  public isDisplay: boolean = false;
  public showAuction: boolean = true;
  public showFlashSale: boolean = false;
  public showPromotions: boolean = false;
  public showHotelDetails: boolean = false;
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('My Trips:: Yayaati');
  }

  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
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
