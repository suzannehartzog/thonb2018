import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-haggling-conversation',
  templateUrl: './haggling-conversation.component.html',
  styleUrls: ['./haggling-conversation.component.css']
})
export class HagglingConversation implements OnInit {
  public roleName: string = "";
  public user: string = localStorage.getItem("ownerUserId");
  public comments: any;
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Haggling Conversation:: Yayaati');

    this.roleName = localStorage.getItem("roleName");

    if (this.roleName == "Traveler") {
      this.getHotelHagglingDetailForUser(2);
    }
    if (this.roleName == "owner") {
      this.getHotelHagglingDetailForOwner(3);
    }
  }

  getHotelHagglingDetailForUser(hagglingId) {
    this.apiSrv.getHotelHagglingDetailForUser(hagglingId).subscribe(
      (data) => {
        this.comments = data.comments;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getAllCartProduct")//Complete Handler
    );
  }

  getHotelHagglingDetailForOwner(hagglingId) {
    this.apiSrv.getHotelHagglingDetailForOwner(hagglingId).subscribe(
      (data) => {
        this.comments = data.comments;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getAllCartProduct")//Complete Handler
    );
  }

  addToHotelHaggling(params: any) {
    let hagglingJson = {
      "comment": params.message,
      "consumerUserId": parseInt(this.user),
      "firstConversation": false,
      "roomType": "Deluxe",
      "hotelId": 1,
      "hagglingId": 1
    };

    if (this.roleName == "Traveler") {
      hagglingJson["couponCode"] = "";
      hagglingJson["reqByConsumer"] = true;
    }
    if (this.roleName == "TravellerAgent") {
      hagglingJson["couponCode"] = params.couponCode;
      hagglingJson["reqByConsumer"] = false;
    }

    this.apiSrv.addToHotelHaggling(hagglingJson).subscribe(
      (data) => {
        if (this.roleName == "user") {
          this.getHotelHagglingDetailForUser(2);
        }
        if (this.roleName == "owner") {
          this.getHotelHagglingDetailForOwner(3);
        }
      }, (error) => {
        console.log(error);
      },
      () => {
        console.log("completed addToHotelHaggling");
      }
    );
  }
}
