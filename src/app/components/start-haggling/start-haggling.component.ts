import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-start-haggling',
  templateUrl: './start-haggling.component.html',
  styleUrls: ['./start-haggling.component.css']
})
export class StartHaggling implements OnInit {
  public message: string = "";
  public messageClass: string = "";
  public userType: string="";
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Start Haggling:: Yayaati');

    this.userType = localStorage.getItem("userType");
  }

  startHaggling(params) {
    let hagglingJson = {};
    if(this.userType == "user") {
      hagglingJson = {
        "comment": params.message,
        "consumerUserId": 1,
        "couponCode": "",
        "firstConversation": true,
        "hagglingId": 1,
        "hotelId": params.hotel,
        "reqByConsumer": true,
        "roomType": params.roomType
      };
    }

    this.apiSrv.addToHotelHaggling(hagglingJson).subscribe(
      (data) => {
        this.messageClass = "alert alert-success";
        this.message = "Haggling started!!!";

        $('.btn.btn-info').addClass('disabled');
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
