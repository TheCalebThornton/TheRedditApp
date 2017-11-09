import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RedditPostService } from '../reddit-post-service';
import { RedditPost } from '../reddit-post';

@Component({
  selector: 'trg-update-personal-gallery-form',
  templateUrl: './update-personal-gallery-form.component.html',
  styleUrls: ['./update-personal-gallery-form.component.css']
})
export class UpdatePersonalGalleryFormComponent implements OnInit {

  constructor(public redditPostService: RedditPostService) { 
    this.redditPostService = redditPostService;
  }

  submitPost(ngForm: NgForm): void {
    let post = new RedditPost();
    post.title = ngForm.value.title;
    post.author = ngForm.value.author;
    post.permaLink = ngForm.value.permaLink;
    post.previewLink = ngForm.value.previewLink;
    this.redditPostService.personalGallery.push(post);
  }

  ngOnInit() {
  }

}
