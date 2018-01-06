import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-my-packages',
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.css']
})
export class MyPackages implements OnInit {
  public isDisplay: boolean = false;
  public showItineraryRequests;
  public userId = localStorage.getItem("userId");
  public getMyItnResponses:any;
  constructor(
    private router: Router, 
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('My Package List:: Yayaati');

    this.apiSrv.getMyPackages(this.userId).subscribe(
      (res:Response) => {
        console.log(res);
        if(res != null || res != undefined) {
          this.isDisplay = false;
          this.getMyItnResponses = res;
        } else {
          this.isDisplay = true;
        }
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getMyItnResponses")//Complete Handler
    );
  }

  toggleDisplay(e) {
    $(e.target).closest(".panel-heading.clickable").next().toggle();
  }
}
