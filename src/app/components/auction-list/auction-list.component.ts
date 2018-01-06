import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  public auctionList:any;
  public showContent:boolean=false;
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
    this.titleService.setTitle('View Auction List :: Yayaati');    
    this.getHotelAuctionsCreatedByHotelOwner(localStorage.getItem("userId"));
  }

  getHotelAuctionsCreatedByHotelOwner(userId){       
    this.apiSrv.getHotelAuctionsCreatedByHotelOwner(5).subscribe(//userId
      (data) => {
        this.auctionList = data; 
        this.showContent=true;      
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );    
  }
}