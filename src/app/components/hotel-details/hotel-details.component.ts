import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit, OnDestroy {
  public id: number;
  private sub: any;
  public showAuction: boolean = true;
  public showFlashSell: boolean = false;
  public showPromotions: boolean = false;
  public showHotelDetails: boolean = false;
  public auctionForm = this.fb.group({
    startDate: ["", Validators.required],
    endDate: ["", Validators.required]
  });
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private el: ElementRef,
    private activeroute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Hotel Details:: Yayaati');
    this.sub = this.activeroute.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  addAuction(event) {
    console.log(event);
    console.log(this.auctionForm.value);
  }  
  toggleTab(tabnae){
    this.showAuction  = false;
    this.showFlashSell = false;
    this.showPromotions = false;
    this.showHotelDetails = false;
    if(tabnae==="auction"){
      this.showAuction  = true;
    }else if(tabnae==="flashsell"){
      this.showFlashSell  = true;
    }else if(tabnae==="promotions"){
      this.showPromotions  = true;
    }else{
      this.showHotelDetails  = true;
    }
  }  
}