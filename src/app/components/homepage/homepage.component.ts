import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

// import the WindowRef provider
import {WindowRef} from './WindowRef';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [ WindowRef ]
})
export class HomepageComponent implements OnInit {
  public speech :any;
  public searchForm = this.fb.group({
    searchQuery: [""]
  });
  constructor(
    private router: Router, 
    private titleService: Title,
    public fb: FormBuilder,
    private winRef: WindowRef
  ) {}

  ngOnInit() {
    
    this.titleService.setTitle('Home:: Yayaati');
    this.startSlider();
    this.speechScript();
    console.log(this);
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

  
  upgrade() {
		alert('Please use Google Chrome v30+ for best experience');
  }
  

  speechScript(){
    let localRef = this;
    if (!(this.winRef.nativeWindow.webkitSpeechRecognition) && !(this.winRef.nativeWindow.speechRecognition)) {
			localRef.upgrade();
		} else {
			localRef.speech = new this.winRef.nativeWindow.webkitSpeechRecognition() || this.winRef.nativeWindow.speechRecognition();
			localRef.speech.continuous = true;
			localRef.speech.interimResults = false;
			localRef.speech.lang = 'en-US';
			localRef.speech.onstart = function() {
				let recognizing = true;
			};
			localRef.speech.onerror = function(event) {
				// Either 'No-speech' or 'Network connection error'
				console.log(event.error);
			};
			localRef.speech.onend = () => {
				let recognizing = false;
				let btn = document.getElementById('btn');
        btn.setAttribute("class", "Start");
        let speechText = (<HTMLInputElement>document.getElementById('speech')).value;
        
        this.search(this.searchForm.value);
			};
			localRef.speech.onresult = function(event) {
				// When recognition produces result
				let interim_transcript = '';
				let final_transcript = '';
				// main for loop for final and interim results
				for (let i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						final_transcript += event.results[i][0].transcript;
					} else {
						interim_transcript += event.results[i][0].transcript;
					}
				}
				final_transcript = final_transcript.toUpperCase();
				let speech = document.getElementById('speech');
				localRef.speech.value = final_transcript;
        localRef.validate();
			};
    }
  }
  process() {
    let btn = document.getElementById('btn');
    if (btn.getAttribute('class') == "Start") {
      this.speech.start();
      btn.setAttribute("class", "Stop");
    } else {
      this.speech.stop();
      btn.setAttribute("class", "Start");
    }
  }
  speak(content) {
    let voices = speechSynthesis.getVoices();
    let derangedVoice = voices.filter(function(voice) {
      return voice.name == 'Deranged';
    })[0];
    let u = new SpeechSynthesisUtterance();
    u.voice = derangedVoice;
    u.text = content;
    speechSynthesis.speak(u);
  }
  validate() {
    console.log("Validate Call");
    let speech = document.getElementById('speech');
  }  
  search(searchQuery){
    this.router.navigate(['/search-result/'+searchQuery.searchQuery]);
  }
}
