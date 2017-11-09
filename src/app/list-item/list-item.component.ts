import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RedditPost } from '../reddit-post';

@Component({
  selector: 'trg-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() post: RedditPost;
  @Output() postEmitter: EventEmitter<RedditPost> = new EventEmitter<RedditPost>();
  selected: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  selectImage(): void {
    this.postEmitter.emit(this.post);
    this.selected = true;
  }

}
