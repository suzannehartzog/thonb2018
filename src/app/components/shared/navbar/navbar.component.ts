import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {ApiDataService} from '../../../services/api-data.service';
import {SharedService} from '../../../services/shared.service';
import { Router, ActivatedRoute  } from '@angular/router';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavComponent implements OnInit { 

  public isLoggedIn: boolean;
  public static updateUserStatus: Subject<boolean> = new Subject();
  public userName: string;
  public notificationList:any;
  public unreadCount:any;  
  public roleName: string;
  public myWalletValue: string = "My Wallet";
  public walletBalance : string;
  constructor(
    private apiSrv : ApiDataService,
    private shrSrv : SharedService,
    private router: Router
  ) { 
   NavComponent.updateUserStatus.subscribe(res => {      
      this.isLoggedIn = ((localStorage.getItem("isloggedIn")==''||localStorage.getItem("isloggedIn")===null)?false:true);
      if(!this.isLoggedIn) {
        //console.log(this.isLoggedIn) ;
      }
      //console.log(this.isLoggedIn);
    });
  }

  ngOnInit() {
    this.notificationInit();
    this.isLoggedIn = ((localStorage.getItem("isloggedIn")==''||localStorage.getItem("isloggedIn")===null)?false:true);
    this.roleName = localStorage.getItem("roleName");

    if(this.isLoggedIn) {
      this.userName = localStorage.getItem("userName");
      this.getAllnotification();
      this.getWalletBalance();
    }    
  }
  getWalletBalance(){
    this.apiSrv.getWalletBalance(localStorage.getItem("userId")).subscribe(
      (data) => {     
        this.walletBalance = data.walletBalance;
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
    }
    );
  }
  toggleWalletMoney(val){
    this.myWalletValue = val;    
  }
  getAllnotification(){
    this.apiSrv.getAllnotification(localStorage.getItem("userId")).subscribe(
      (data) => {        
        this.notificationList = data.notifications; 
        this.unreadCount = data.unreadCount; 
      }, (error) => {
        console.log(error); 
      },
      () => {
        console.log("completed changeCurrency");
    }
    );
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

    this.apiSrv.markAllNotificationRead(localStorage.getItem("userId")).subscribe(
      (data) => {
        //console.log(data);
      }, (error) => {
        //console.log(error); 
      },
      () => {
      //console.log("completed markAllNotificationRead");
      }
    );

    if($('.toggle').hasClass('close')){
      $('.menu').removeClass('open').slideUp();
      $('.w3nav').removeClass('show-w3nav');  
      $('.w3nav a').removeClass('show-w3nav-link');  
      $('.toggle').removeClass('close'); 
    }    
    $('#notifications').fadeToggle('fast', 'linear', function () {
      if ($('#notifications').is(':hidden')) {
          $('#noti_Button').css('background-color', '#2E467C');
      }
      else $('#noti_Button').css('background-color', '#FFF');        // CHANGE BACKGROUND COLOR OF THE BUTTON.
    });
    $('#noti_Counter').css({ visibility: 'hidden' })                  // HIDE THE COUNTER.
    return false;
  }

  selectRoute(typeNoti) {
    switch(typeNoti) {
      case "Q": //Request for quote/ Response of Quote (traveller)
        this.roleName == "Traveler" ?  this.router.navigate(["quote-request"]) : this.router.navigate(["show-itin-request"]);
      break;
      case "A": //Auction notification (traveller)
        this.roleName == "Traveler" ?  this.router.navigate(["e-auction"]) : this.router.navigate([""]);
      break;
      case "B": //BID
      break;
      case "H": // Hagling (traveller/TA/Owner)
        this.router.navigate(["haggling-conversation"]);
      break;
      default:
        this.router.navigate([""]);
    }
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
