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
      let itemWidth:any;
      let direction:boolean;
      if($(window).width() < 768){
        itemWidth = "100%";
        direction = false;
      }else if($(window).width() < 1024){
        itemWidth = $(".flexslider").width()/3;
        direction = true;
      }else{
        itemWidth = $(".flexslider").width()/4;
        direction = true;
      }
      $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        directionNav: direction,
        animationLoop: true,
        itemWidth: itemWidth,
        itemMargin: 0,
        slideshow: true, 
        slideshowSpeed: 4000,
        touch: true,
        start: function(slider){
          $('body').removeClass('loading');
        }
    });
  }
  search(searchQuery){
	 this.router.navigate(['/search-result/'+searchQuery.searchQuery]);
  }
}
