import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[trgHighlightHover]'
})
export class HighlightHoverDirective {
  element: ElementRef;
  constructor(element: ElementRef, private renderer: Renderer2) {
    this.element = element;
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.element.nativeElement, "highlight");
  }
  
  @HostListener('mouseleave') onMouseLeave() {
      this.renderer.removeClass(this.element.nativeElement, "highlight");
  }

}
