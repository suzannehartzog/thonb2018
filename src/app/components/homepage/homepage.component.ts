import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public searchForm = this.fb.group({
    searchQuery: [""]
  });
  constructor(
    private router: Router, 
    private titleService: Title,
	public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Home:: Yayaati');
    this.startSlider();
  }

  startSlider() {
      $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        itemWidth: $(".flexslider").width()/4,
        itemMargin: 5,
        start: function(slider){
          $('body').removeClass('loading');
        }
    });
  }
  search(searchQuery){
	 this.router.navigate(['/search-result/'+searchQuery.searchQuery]);
  }
}
