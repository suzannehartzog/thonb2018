import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.css']
})
export class DriverRegistrationComponent implements OnInit {
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Driver Registration:: Yayaati');
  }
}
