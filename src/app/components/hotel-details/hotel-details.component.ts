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
  public hasError : boolean = false;
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
      this.getHotelDetails(this.hotelId);
      this.getAllroomTypeCapacity(this.hotelId);
   });   
  }
  getHotelDetails(hotelId) {
    //console.log(params);   
    //localStorage.setItem("originCityId", params.originCityId);
    this.apiSrv.getHotelDtlByHotelId(hotelId).subscribe(
      (data) => {
        this.hotelDetails = data; 
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
      }
    );
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
  // getAvailableRoomsForBooking(functionName){
  //   let params = {
  //     "bookingEndDate": this.auctionForm.value.roomLockedTill,
  //     "bookingStartDate": this.auctionForm.value.roomLockedFrom,
  //     "hotelId": this.hotelId,
  //     "roomCapacity": this.auctionForm.value.roomCapacity,
  //     "roomType": this.auctionForm.value.roomTypeName
  //   };
  //   this.apiSrv.getAvailableRoomsForBooking(params).subscribe(
  //     (data) => {
  //       if(data>0){
  //         if(functionName==='addAuction'){
  //           this.addAuction();
  //         }else{
  //           this.addFlashSale();
  //         }
  //       } else{
  //         this.hasError = true;
  //       }
  //     }, (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       console.log("completed");
  //     }
  //   );
  // }
  addAuction() {
	  //this.getAvailableRoomsForBooking(this.auctionForm.value);
    this.auctionForm.controls['hotelId'].setValue(this.hotelId);
    this.auctionForm.controls['eventType'].setValue('A');
    //console.log(this.auctionForm.value);
    this.apiSrv.createAuction(this.auctionForm.value).subscribe(
      (data) => {
        if(data>0){
          console.log(data);
        } else{
          this.hasError = true;
        }
        console.log(data); 
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
      }
    );
  }  
  addFlashSale() {
    this.flashSaleForm.controls['hotelId'].setValue(this.hotelId);
    this.flashSaleForm.controls['eventType'].setValue('F');
    //console.log(this.flashSaleForm.value);
	
    this.apiSrv.createFlashSale(this.flashSaleForm.value).subscribe(
      (data) => {
        if(data>0){
          console.log(data);
        } else{
          this.hasError = true;
        }
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
      }
    );
  }  
  addPromotion(event) {
    this.promotionForm.controls['hotelId'].setValue(this.hotelId);
    this.promotionForm.controls['eventType'].setValue('P');
    console.log(this.promotionForm.value);
    this.apiSrv.createPromotion(this.promotionForm.value).subscribe(
      (data) => {
        console.log(data); 
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
      }
    );
  }
  setRoomCapacity(event){
    const capacity = event.target.options[event.target.selectedIndex].getAttribute('data-capacity');
    this.roomCapacity.length = capacity; 
  }
  toggleTab(tabnae){
    this.hasError = false;
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