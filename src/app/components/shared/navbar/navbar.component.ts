import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavComponent implements OnInit { 
  constructor() { 
   
  }

  ngOnInit() {}

  togglePanel() {
			$('.menu').toggleClass('open').slideToggle();  
			$('.w3nav').toggleClass('show-w3nav');  
			$('.w3nav a').toggleClass('show-w3nav-link');  
			$('.toggle').toggleClass('close');  
  }
}
