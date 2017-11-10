import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RedditPost } from '../reddit-post';
import { RedditPostService } from '../reddit-post-service';

@Component({
  selector: 'trg-fancy-frame',
  templateUrl: './fancy-frame.component.html',
  styleUrls: ['./fancy-frame.component.css']
})
export class FancyFrameComponent implements OnInit {
  @Input() post: RedditPost;
  @Output() postEmitter = new EventEmitter<RedditPost>();
  height: number = 250;

  constructor(private redditPostService: RedditPostService) {}

  nextPost(): void {
    this.post = this.redditPostService.nextPost();
    this.postEmitter.emit(this.post);
  }

  changeHeight(value: number): void {
    this.height += value;
  }

  addToMyGallery(): void {
    this.redditPostService.addToGallery(this.post);
  }

  removeFromMyGallery(): void {
    this.redditPostService.removeFromGallery(this.post);
  }

  ngOnInit() {
  }

}
