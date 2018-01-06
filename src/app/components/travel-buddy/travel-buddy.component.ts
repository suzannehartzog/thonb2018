import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-travel-buddy',
  templateUrl: './travel-buddy.component.html',
  styleUrls: ['./travel-buddy.component.css']
})
export class TravelBuddy implements OnInit { 
  public isDisplay: boolean = false; 
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Find a Buddy to make a trip together:: Yayaati');
  }

  toggleDisplay() {
    this.isDisplay = !this.isDisplay
  }
}
