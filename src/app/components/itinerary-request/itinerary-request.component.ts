import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-itinerary-request',
  templateUrl: './itinerary-request.component.html',
  styleUrls: ['./itinerary-request.component.css']
})
export class ItineraryRequest implements OnInit {  
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Itinerary Request:: Yayaati');
  }
}
