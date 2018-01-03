import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-itin-request',
  templateUrl: './show-itin-request.component.html',
  styleUrls: ['./show-itin-request.component.css']
})
export class ShowItinRequest implements OnInit {
  public isDisplay: boolean = false; 
  public isChildDisplay: boolean = false; 
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Show Itinerary Requests:: Yayaati');
  }

  toggleDisplay() {
    this.isDisplay = !this.isDisplay
  }
  toggleChildDetails() {
this.isChildDisplay = !this.isChildDisplay;
  }
}
