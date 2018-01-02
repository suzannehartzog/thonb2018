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

  ngOnInit() {
    this.notificationInit();
  }

  togglePanel() {
      $('#notifications').fadeOut('fast');
			$('.menu').toggleClass('open').slideToggle();  
			$('.w3nav').toggleClass('show-w3nav');  
			$('.w3nav a').toggleClass('show-w3nav-link');  
			$('.toggle').toggleClass('close');  
  }

  notificationInit(){
    $('#noti_Counter')
    .css({ opacity: 1 })    
    .text('7');
  }
  
  toggleNotificationWindow(){
    $('.menu').removeClass('open').slideUp();
    $('.w3nav').removeClass('show-w3nav');  
    $('.w3nav a').removeClass('show-w3nav-link');  
    $('.toggle').addClass('close'); 
    $('#notifications').fadeToggle('fast', 'linear', function () {
      if ($('#notifications').is(':hidden')) {
          $('#noti_Button').css('background-color', '#2E467C');
      }
      else $('#noti_Button').css('background-color', '#FFF');        // CHANGE BACKGROUND COLOR OF THE BUTTON.
    });
    $('#noti_Counter').css({ visibility: 'hidden' })                  // HIDE THE COUNTER.
    return false;
  }

      // // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
      // $(document).click(function () {
      //     $('#notifications').hide();

      //     // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
      //     if ($('#noti_Counter').is(':hidden')) {
      //         // CHANGE BACKGROUND COLOR OF THE BUTTON.
      //         $('#noti_Button').css('background-color', '#2E467C');
      //     }
      // });

      // $('#notifications').click(function () {
      //     return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
      // });
}
