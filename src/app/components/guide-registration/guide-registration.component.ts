import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-guide-registration',
  templateUrl: './guide-registration.component.html',
  styleUrls: ['./guide-registration.component.css']
})
export class GuideRegistrationComponent implements OnInit {
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Guide Registration:: Yayaati');
  }
}
