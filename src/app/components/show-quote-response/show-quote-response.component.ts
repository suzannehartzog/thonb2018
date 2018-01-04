import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-quote-response',
  templateUrl: './show-quote-response.component.html',
  styleUrls: ['./show-quote-response.component.css']
})
export class ShowQuoteResponseComponent implements OnInit {
  public isDisplay: boolean = false; 
  public isChildDisplay: boolean = false; 
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Show Quote Respnose:: Yayaati');
  }

  toggleDetails() {
    this.isDisplay = !this.isDisplay
  }
  toggleChildDetails() {
this.isChildDisplay = !this.isChildDisplay;
  }
}
