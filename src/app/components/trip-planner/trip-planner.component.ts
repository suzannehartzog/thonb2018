import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})
export class TripPlannerComponent implements OnInit {
  public isDisplay: boolean = false; 
  public isChildDisplay: boolean = false; 
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('trip planner:: Yayaati');
  }

  toggleDisplay() {
    this.isDisplay = !this.isDisplay
  }
  toggleChildDisplay() {
this.isChildDisplay = !this.isChildDisplay;
  }
}
