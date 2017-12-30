import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-itinerary-conversation',
  templateUrl: './itinerary-conversation.component.html',
  styleUrls: ['./itinerary-conversation.component.css']
})
export class ItineraryConversation implements OnInit {  
  constructor(
    private router: Router, 
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Itinerary Conversation:: Yayaati');
  }
}
