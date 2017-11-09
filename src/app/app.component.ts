import { Component } from '@angular/core';
import { RedditPostService } from './reddit-post-service';
import { RedditPost } from './reddit-post';

@Component({
  selector: 'trg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trg';
  post: RedditPost;

  constructor(private postService: RedditPostService){
    this.post = postService.nextPost();
  }
  
  setPost(post: RedditPost): void {
    this.post = post;
  }
}
