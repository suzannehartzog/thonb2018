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
	public showResults.hotels:[];
	public showResults.packages:[];
	public showResults.guides:[];
	public showResults.transports:[];
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
			this.showResults = this.searchResults = data; 
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
		this.showResults='';	
		if(filterBy=="all"){
			this.showResults = this.searchResults;
			$("#hotel").addClass("hide");
		}else if(filterBy=="hotel"){
			this.showResults={
				hotels:this.searchResults.hotels
			};
			$("#hotel").removeClass("hide");
		}else if(filterBy=="guide"){
			this.showResults={
				guides:this.searchResults.guides
			};
			$("#hotel").addClass("hide");
		}else if(filterBy=="transport"){
			this.showResults={
				transports:this.searchResults.transports
			};
			$("#hotel").addClass("hide");
		}else{//package
			this.showResults={
				packages:this.searchResults.packages
			};
			$("#hotel").addClass("hide");
		}		
	}
}
