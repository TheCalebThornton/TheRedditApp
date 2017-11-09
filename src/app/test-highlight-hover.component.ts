import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trg-test-highlight-hover',
  template: `
  <img trgHighlightHover/>
  `,
  styleUrls: ['./app.component.css']
})
export class TestHighlightHoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
