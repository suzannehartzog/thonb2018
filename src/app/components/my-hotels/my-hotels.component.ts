import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrls: ['./my-hotels.component.css']
})
export class MyHotels implements OnInit { 
  public isDisplay: boolean = false; 
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('All My Hotels:: Yayaati');
  }

  toggleDisplay() {
    this.isDisplay = !this.isDisplay
  }
}
