import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-get-my-package',
  templateUrl: './get-my-package.component.html',
  styleUrls: ['./get-my-package.component.css']
})
export class GetMyPackageComponent implements OnInit {
  public isDisplay: boolean = false; 
  public isChildDisplay: boolean = false; 
  public getMyPackages: {};
  public userId = localStorage.getItem("userId");
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
        this.getMyPackages = res;
      },
      (error) => console.log(error),//Error Handler
      () => console.log("completed getMyPackages")//Complete Handler
    );
  }

  toggleDisplay(event) {
    this.isDisplay = !this.isDisplay
  }
  toggleChildDetails() {
    this.isChildDisplay = !this.isChildDisplay;
  }
}
