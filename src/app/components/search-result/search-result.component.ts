import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiDataService } from '../../services/api-data.service';
import { SharedService } from '../../services/shared.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
	public searchForm = this.fb.group({
		searchQuery: [""]
	});
	public queryString:string;
	public searchResults:{};
	public showResults:{};
	public sub:any;
	public showAll:boolean=false;
	public showHotels:boolean=false;
	public showGuides:boolean=false;
	public showPackages:boolean=false;
	public showTransports:boolean=false;

	constructor(
		private router: Router, 
		private titleService: Title,
		private activeroute: ActivatedRoute,
		private apiSrv: ApiDataService,
		private shrSrv: SharedService,
		public fb: FormBuilder		
	) {}

	ngOnInit() {
		this.titleService.setTitle('Search Result:: Yayaati');
		this.sub = this.activeroute.params.subscribe(params => {
		  this.queryString = params['query'];
		  this.getsearchByText(this.queryString);
		});
	}
	getsearchByText(queryString){
		this.apiSrv.textSearch(queryString).subscribe(
		  (data) => {
			console.log(data);
			this.searchResults = data; 
			this.showAll=true;
			this.showHotels=false;
			this.showPackages=false;
			this.showGuides=false;
			this.showTransports=false;
		  }, (error) => {
			console.log(error); 
		  },
		  () => {
			console.log("completed");
		  }
		);
	}
	search(searchQuery){
		this.router.navigate(['/search-result/'+searchQuery.searchQuery]);
	}
	filterResult(filterBy){
		if(filterBy=="all"){
			this.showAll=true;
			this.showHotels= this.showPackages= this.showGuides= this.showTransports=false;
			$("#hotel").addClass("hide");
		}else if(filterBy=="hotel"){
			this.showAll= this.showPackages= this.showGuides= this.showTransports=false;
			this.showHotels=true;			
			$("#hotel").removeClass("hide");
		}else if(filterBy=="guide"){
			this.showAll= this.showHotels= this.showPackages= this.showTransports=false;
			this.showGuides=true;
			$("#hotel").addClass("hide");
		}else if(filterBy=="transport"){
			this.showAll= this.showHotels= this.showPackages= this.showGuides=false;
			this.showTransports=true;
			$("#hotel").addClass("hide");
		}else{//package
			this.showAll = this.showHotels= this.showGuides= this.showTransports=false;
			this.showPackages=true;			
			$("#hotel").addClass("hide");
		}		
	}
}
