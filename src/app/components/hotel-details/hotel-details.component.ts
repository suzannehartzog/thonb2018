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
  public defaultValue = {roomTypeName: null, roomCapacity:null}
  public hotelId: number;
  public roomTypeList:any=[];
  public roomCapacity:any=[];
  private sub: any;
  public showAuction: boolean = true;
  public showFlashSale: boolean = false;
  public showPromotions: boolean = false;
  public showHotelDetails: boolean = false;
  public auctionForm = this.fb.group({
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    buyNowPrice : ["", Validators.required],    
    roomCapacity : ["", Validators.required],
    roomLockedFrom: ["", Validators.required],
    roomLockedTill: ["", Validators.required],
    roomTypeName : ["", Validators.required],
    startingPrice: ["", Validators.required],
    eventType: ["", Validators.required],
    hotelId: ["", Validators.required],
    auctionComment: ["", Validators.required]
  });
  public flashSaleForm = this.fb.group({
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    flashsalePrice : ["", Validators.required],    
    roomCapacity : ["", Validators.required],
    roomLockedFrom: ["", Validators.required],
    roomLockedTill: ["", Validators.required],
    roomTypeName : ["", Validators.required],
    eventType: ["", Validators.required],
    hotelId: ["", Validators.required],
    flashSaleComment: ["", Validators.required]
  });
  public promotionForm = this.fb.group({
    discountAmount : ["", Validators.required],    
    roomCapacity : ["", Validators.required],
    roomTypeName : ["", Validators.required],
    eventType: ["", Validators.required],
    hotelId: ["", Validators.required],
    promotionComment: ["", Validators.required]
  });
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private el: ElementRef,
    private activeroute: ActivatedRoute,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Hotel Details:: Yayaati');
    this.sub = this.activeroute.params.subscribe(params => {
      this.hotelId = +params['id'];
      this.getAllroomTypeCapacity(this.hotelId);
   });
   
  }
  getAllroomTypeCapacity(hotelId) {
    //console.log(params);   
    //localStorage.setItem("originCityId", params.originCityId);
    this.apiSrv.roomTypeCapacity(hotelId).subscribe(
      (data) => {
        console.log(data);
        this.roomTypeList = data; 
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
      }
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  addAuction(event) {
    this.auctionForm.controls['hotelId'].setValue(this.hotelId);
    this.auctionForm.controls['eventType'].setValue('a');
    console.log(this.auctionForm);
  }  
  addFlashSale(event) {
    this.flashSaleForm.controls['hotelId'].setValue(this.hotelId);
    this.flashSaleForm.controls['eventType'].setValue('f');
    console.log(this.flashSaleForm.value);
  }  
  addPromotion(event) {
    this.promotionForm.controls['hotelId'].setValue(this.hotelId);
    this.promotionForm.controls['eventType'].setValue('p');
    console.log(this.promotionForm.value);
  }
  setRoomCapacity(event){
    const capacity = event.target.options[event.target.selectedIndex].getAttribute('data-capacity');
    this.roomCapacity.length = capacity; 
  }
  toggleTab(tabnae){
    this.showAuction  = false;
    this.showFlashSale = false;
    this.showPromotions = false;
    this.showHotelDetails = false;
    if(tabnae==="auction"){
      this.showAuction  = true;
    }else if(tabnae==="flashsale"){
      this.showFlashSale  = true;
    }else if(tabnae==="promotions"){
      this.showPromotions  = true;
    }else{
      this.showHotelDetails  = true;
    }
  }  
}