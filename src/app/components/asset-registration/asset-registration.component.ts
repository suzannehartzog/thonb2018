import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-asset-registration',
  templateUrl: './asset-registration.component.html',
  styleUrls: ['./asset-registration.component.css']
})
export class AssetRegistrationComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Asset Registration:: Yayaati');
  }

  ngAfterViewInit() {
    this.RegisterMouseDown();
  }

  RegisterMouseDown() {
    this.el.nativeElement.removeEventListener("mousedown", this.OnMouseDown.bind(this));
    this.el.nativeElement.addEventListener("mousedown", this.OnMouseDown.bind(this));
  }
  OnMouseDown(event) {
    if (event.target != null && event.target.className=="btn btn-info add-hotel") {
      
    }
  }
  removeThisHotel(e) {
    $(e.target).closest(".room-info").remove();
  }

  // addNewHotel(e) {
  //   $(e.target).closest(".room-info")
  //     .clone()
  //     .insertAfter("div.room-info:last")
  //     .find("input,select").val("");
  // }
}
