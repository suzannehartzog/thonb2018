import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit, OnDestroy {
  public hotelDetails = {};
  public hotelId: number;
  public assetsType: string;  
  public roleName: string;
  public sub :any;
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
      this.assetsType = params['assetstype'];
      console.log(this.hotelId, this.assetsType);
      this.getHotelDetails(this.hotelId);
      this.roleName = localStorage.getItem("roleName");
   });   
  }
  getHotelDetails(hotelId) {
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  checkout(id){
    localStorage.setItem("checkoutId", id);
    this.router.navigate(['/check-out']);
  }  
}