import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect  } from '@angular/core/testing';
import { HighlightHoverDirective } from './highlight-hover.directive';
import { TestHighlightHoverComponent } from './test-highlight-hover.component';


describe('testMouseOverHoverComponent', () => {
  let testComponent: TestHighlightHoverComponent;
  let fixture: ComponentFixture<any>;
  let myImage : Element

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [   ],
      declarations: [ TestHighlightHoverComponent, HighlightHoverDirective ],
      providers:[  ],
      
    })
    .compileComponents();
  }));

  beforeEach(()=>{
     fixture = TestBed.createComponent(TestHighlightHoverComponent);
     testComponent = fixture.debugElement.componentInstance;
     fixture.detectChanges();
     myImage = fixture.debugElement.nativeElement.querySelectorAll('img')[0];
  });

  it('adds the hover class to our element on mouse over', (() => {
    myImage.dispatchEvent(new Event('mouseenter')); 
    expect(myImage.className).toContain("highlight");
  }));

  it('removes hover class to our element on mouse out', (() => {
    myImage.dispatchEvent(new Event('mouseenter')); 
    expect(myImage.className).toContain("highlight");
    
    myImage.dispatchEvent(new Event('mouseleave'));
    expect(myImage.className).not.toContain("highlight");
  }));
});