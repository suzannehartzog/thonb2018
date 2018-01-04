import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-show-itin-request',
  templateUrl: './show-itin-request.component.html',
  styleUrls: ['./show-itin-request.component.css']
})
export class ShowItinRequest implements OnInit {
  public isDisplay: boolean = false; 
  public isChildDisplay: boolean = false; 
  public showItineraryRequests;
  public myPackages;
  public messageClass;
  public message;
  constructor(
    private router: Router, 
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Show Itinerary Requests:: Yayaati');

    this.apiSrv.showItineraryRequests().subscribe(
      (res:Response) => {
        console.log(res);
        this.showItineraryRequests = res;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed cityList")//Complete Handler
    );

    this.apiSrv.getMyPackages(localStorage.getItem("userId")).subscribe(
      (res:Response) => {
        console.log(res);
        this.myPackages = res;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getMyPackages")//Complete Handler
    );
  }

  toggleDisplay(e) {
    $(e.target).closest(".panel-heading.clickable").next(".panel-body").toggleClass("hideMe");
  }
  toggleChildDetails() {
    this.isChildDisplay = !this.isChildDisplay;
  }
  respondToCreateItineraryRequest(params) {
    let product = params;
    product.itineraryRequestorId = localStorage.getItem("userId");
    product.itineraryId = params.itineraryId.split("-")[0];
    product.packageId = params.itineraryId.split("-")[1];
    this.apiSrv.respondToCreateItineraryRequest(product).subscribe(
      (data) => {
        this.messageClass = "alert alert-success";
        this.message = "Package successfully created!";

        $('.btn.btn-info').addClass('disabled');
      }, (error) => {
        this.messageClass = "alert alert-danger";
        this.message = "Package registration failed!";
        console.log(error);
      },
      () => {
        console.log("completed respondToCreateItineraryRequest");
      }
    );
  }
}
