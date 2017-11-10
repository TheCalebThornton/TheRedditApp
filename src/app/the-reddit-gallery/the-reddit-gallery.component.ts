import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RedditPost } from '../gallery-feature/reddit-post';
import { RedditPostService } from '../gallery-feature/reddit-post-service';

@Component({
  selector: 'trg-the-reddit-gallery',
  templateUrl: './the-reddit-gallery.component.html',
  styleUrls: ['./the-reddit-gallery.component.css'],
})
export class TheRedditGalleryComponent implements OnInit {

  post: RedditPost;
  personalGallery: Array<RedditPost>;
  searchGallery: Array<RedditPost>;

  constructor(private redditPostService: RedditPostService){
    this.post = redditPostService.nextPost();
    this.personalGallery = redditPostService.personalGallery;
    this.searchGallery = redditPostService.searchGallery;
  }
  
  setPost(post: RedditPost): void {
    this.post = post;
  }

  ngOnInit() {
  }

}
