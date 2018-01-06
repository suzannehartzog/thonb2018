import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-start-haggling',
  templateUrl: './start-haggling.component.html',
  styleUrls: ['./start-haggling.component.css']
})
export class StartHaggling implements OnInit {
  public message: string = "";
  public messageClass: string = "";
  public userType: string="";
  public sub :any;
  public hotelId: number;
  public roomType: string;  
  public hotelDetails = {
    'hotelName':''
  };
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService,
    private el: ElementRef,
    private activeroute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Start Haggling:: Yayaati');

    this.userType = localStorage.getItem("userType");

    this.sub = this.activeroute.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
      this.roomType = params['roomType'];
      console.log(this.hotelId, this.roomType);
   }); 
   this.getHotelDetails(this.hotelId);
   
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

  startHaggling(params) {
    let hagglingJson = {};
      hagglingJson = {
        "comment": params.message,
        "firstConversation": true,
        "hotelId": this.hotelId,
        "roomType": this.roomType,
        "userId": parseInt(localStorage.getItem("userId"))
      };
  
    this.apiSrv.addToHotelHaggling(hagglingJson).subscribe(
      (data) => {
        this.messageClass = "alert alert-success";
        this.message = "Happy Haggling!";

        //$('.btn.btn-info').addClass('disabled');
      }, (error) => {
        this.messageClass = "alert alert-danger";
        this.message = "Error in haggling!";
        console.log(error);
      },
      () => {
        console.log("completed addToHotelHaggling");
      }
    );
  }
}
