import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RedditPostService } from '../reddit-post-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'trg-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  searchInput: FormControl = new FormControl('');
  searchForm: FormGroup = this.formBuilder.group({
    searchInput: this.searchInput
  });
  
  constructor(public formBuilder: FormBuilder, private redditPostService: RedditPostService, private route: ActivatedRoute) { }

  search(): void {
    let searchTerm: String = this.searchInput.value;
    this.redditPostService.clearSearchResults();    
    this.redditPostService.fetchPostFromReddit(searchTerm)
      .subscribe(
        (post) => {
          this.redditPostService.searchGallery.push(post);
        },
        (error) => {
          console.log(error);
        },
        () => {
          if(this.redditPostService.searchGallery.length == 0){
            console.log('No results found...')
          }
        }
      );
  }

  ngOnInit() {
    this.searchForm.valueChanges
    .debounceTime(1000)
    .subscribe(() => {
      this.search();
    });

    this.route.queryParams
    .subscribe((param) => {
      this.searchInput.setValue(param.searchTerm || "");
    });
  }


}
