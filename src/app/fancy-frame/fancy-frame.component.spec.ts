import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FancyFrameComponent } from './fancy-frame.component';
import { RedditPost } from "../reddit-post";
import { RedditPostService } from "../reddit-post-service";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FancyFrameComponent', () => {
  let component: FancyFrameComponent;
  let fixture: ComponentFixture<FancyFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyFrameComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ RedditPostService ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyFrameComponent);
    component = fixture.componentInstance;
    component.post = new RedditPost();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
