import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RedditPostService } from '../reddit-post-service';
import { RedditPost } from '../reddit-post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'trg-update-personal-gallery-form',
  templateUrl: './update-personal-gallery-form.component.html',
  styleUrls: ['./update-personal-gallery-form.component.css']
})
export class UpdatePersonalGalleryFormComponent implements OnInit {
  route: ActivatedRoute;
  router: Router;
  searchTerm: String = '';

  constructor(public redditPostService: RedditPostService, route: ActivatedRoute, router: Router) { 
    this.redditPostService = redditPostService;
    this.route = route;
    this.router = router;
  }

  submitPost(ngForm: NgForm): void {
    let post = new RedditPost();
    post.title = ngForm.value.title;
    post.author = ngForm.value.author;
    post.permaLink = ngForm.value.permaLink;
    post.previewLink = ngForm.value.previewLink;
    this.redditPostService.personalGallery.push(post);
    this.router.navigate(["/mygallery"],  { queryParams: { searchTerm: this.searchTerm } });    
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe((params) => {
      this.searchTerm = params.searchTerm;
    });
  }

}
