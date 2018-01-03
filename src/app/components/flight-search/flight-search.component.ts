import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  public searchFlightForm = this.fb.group({
    tripType:'',
    startDate: '',
    returnDate: '',
    origin : '',    
    destination : '',
    flexiSearch: '',
    nonstopFlights: ''
  });
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
  }
  searchFlight(){
    this.apiSrv.flightSearch(this.searchFlightForm.value).subscribe(
      (data) => {
        console.log(data); 
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed");
      }
    );
  }
}