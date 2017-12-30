import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DatePicker } from '../../directives/datepicker/datepicker';
import { FormsModule } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})
export class CreateItineraryComponent implements OnInit {

  public itinParam: Object;
  constructor(
    private router: Router,
    private titleService: Title,
    private apiSrv: ApiDataService,
    private shrSrv: SharedService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Create Itinerary:: Yayaati');
  }

  submitItinerary(params: any) {
    this.apiSrv.createItinerary(params).subscribe(
      (data) => {

      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
      }
    );
  }
}
