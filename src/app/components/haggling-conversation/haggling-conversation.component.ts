import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-haggling-conversation',
  templateUrl: './haggling-conversation.component.html',
  styleUrls: ['./haggling-conversation.component.css']
})
export class HagglingConversation implements OnInit {
  public roleName: string = "";
  public user: string = localStorage.getItem("ownerUserId");
  public comments: any;
  public userId: string = localStorage.getItem("userId");
  public haggleData: {};
  public runningHaggleId: number = null;
  public haggleSelectedId: number = 0;  
  public conversationDetails: string;
  public conversations: string;
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Haggling Conversation:: Yayaati');

    this.roleName = localStorage.getItem("roleName");

    this.getMyHagglings(this.userId);

    $(".row.content-wrap.messages").css("height", "75.9%");
  }

  getMyHagglings(userId) {
     this.apiSrv.getMyHagglings(userId).subscribe(
      (data) => {
        this.haggleData = data;
        //console.log(this.haggleData);
        if(this.haggleData !== null) {
          this.getHotelHagglingDetail(this.haggleData[0].id);        
        } else {
          alert("No haggling data available!")  ;
        }
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getMyHagglings")//Complete Handler
    );
  }

  getHotelHagglingDetail(hagglingId) {
    this.apiSrv.getHotelHagglingDetail(hagglingId).subscribe(
      (data) => {
        this.runningHaggleId = hagglingId;
        this.comments = data.comments;    
        this.haggleSelectedId = hagglingId;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getHotelHagglingDetail")//Complete Handler
    );
  }

  addToHotelHaggling(params: any) {
    console.log(params);
    let hagglingJson = {
      "comment": params.message,
      "userId": parseInt(this.userId),
      "firstConversation": false,
      "hagglingId": this.runningHaggleId
    };

    if (this.roleName == "Traveler") {
      hagglingJson["couponCode"] = "";
      hagglingJson["reqByConsumer"] = true;      
    }
    if (this.roleName == "Hotel") {
      hagglingJson["couponCode"] = params.couponCode;
      hagglingJson["reqByConsumer"] = false;      
    }

    this.apiSrv.addToHotelHaggling(hagglingJson).subscribe(
      (data) => {
        this.getHotelHagglingDetail(this.runningHaggleId);
      }, (error) => {
        console.log(error);
      },
      () => {
        this.runningHaggleId = null;  
        this.haggleSelectedId  = null;
        console.log("completed addToHotelHaggling");
      }
    );
  }
}
