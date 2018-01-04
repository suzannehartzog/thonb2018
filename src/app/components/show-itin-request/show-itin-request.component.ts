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

    this.apiSrv.retrievePackageDetails(localStorage.getItem("userId")).subscribe(
      (res:Response) => {
        console.log(res);
        this.myPackages = res;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed retrievePackageDetails")//Complete Handler
    );
  }

  toggleDisplay(e) {
    $(e.target).closest(".panel-heading.clickable").next(".panel-body").toggleClass("hideMe");
  }
  
  respondToCreateItineraryRequest(params) {
    let product = params;
    product.itineraryRequestorId = params.packageId.split("-")[0];
    product.itineraryId = params.packageId.split("-")[1];
    product.packageId = params.packageId.split("-")[2];
    this.apiSrv.respondToCreateItineraryRequest(product).subscribe(
      (data) => {
        this.messageClass = "alert alert-success";
        this.message = "Thanks for responding to traveller!";

        //$('.btn.btn-info').addClass('disabled');
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
