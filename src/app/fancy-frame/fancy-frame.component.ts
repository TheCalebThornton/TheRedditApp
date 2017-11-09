import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RedditPost } from '../reddit-post';
import { RedditPostService } from '../reddit-post-service';

@Component({
  selector: 'trg-fancy-frame',
  templateUrl: './fancy-frame.component.html',
  styleUrls: ['./fancy-frame.component.css']
})
export class FancyFrameComponent implements OnInit {
  @Input()post: RedditPost;
  @Output()postEmitter: EventEmitter<RedditPost> = new EventEmitter<RedditPost>();
  constructor(public postService:RedditPostService) {}

  nextPost(): void {
    this.post = this.postService.nextPost();
    this.postEmitter.emit(this.post);
  }

  ngOnInit() {
  }

}
