import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RedditPost } from '../reddit-post';
import { RedditPostService } from '../reddit-post-service';

@Component({
  selector: 'trg-reddit-post-list',
  templateUrl: './reddit-post-list.component.html',
  styleUrls: ['./reddit-post-list.component.css']
})
export class RedditPostListComponent implements OnInit {
  posts: RedditPost[];
  postSerivce: RedditPostService;
  @Output() postEmitter: EventEmitter<RedditPost> = new EventEmitter<RedditPost>();
  constructor(postService: RedditPostService) {
    this.posts = postService.personalGallery
    this.postSerivce = postService;
  }

  ngOnInit() {

  }

  emitPost(post:RedditPost): void {
    this.postEmitter.emit(post);
  }


}
