import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-package-registration',
  templateUrl: './package-registration.component.html',
  styleUrls: ['./package-registration.component.css']
})
export class PackageRegistrationComponent implements OnInit {
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Package Registration:: Yayaati');
  }
}
