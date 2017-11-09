import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from "./app.module";
import { RedditPost } from "./reddit-post";
import { RedditPostService } from "./reddit-post-service";
import { FancyFrameComponent } from "./fancy-frame/fancy-frame.component";
import { RedditPostListComponent } from "./reddit-post-list/reddit-post-list.component";

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<any>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [ ],
      providers: [ RedditPostService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'trg'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('trg');
  }));

  it("should initialize the value to whatever the first element in the array", async(() => {
    const service: RedditPostService = fixture.debugElement.injector.get(RedditPostService);
    expect(app.post).toEqual(service.personalGallery[0]);
  }));

  it("should change the value of its post property when the img from the listItemComponent is clicked", async(() => {
    const listFixture = TestBed.createComponent(RedditPostListComponent);
    const listComponent: RedditPostListComponent = listFixture.debugElement.componentInstance;
    expect(app.post).toEqual(listComponent.posts[0]);
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelectorAll('.preview')[1].click();
    fixture.detectChanges();
    expect(app.post).toEqual(listComponent.posts[1]);
  }));

  it("should set the img in the FancyFrameComponent to be its post property when it changes", async(() =>{
    const listFixture = TestBed.createComponent(RedditPostListComponent);
    const listComponent: RedditPostListComponent = listFixture.debugElement.componentInstance;
    expect(app.post).toEqual(listComponent.posts[0]);
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelectorAll(".preview")[2].click();
    fixture.detectChanges();
    expect(app.post).toEqual(listComponent.posts[2]);
    expect(compiled.querySelector("#fancyFrame").src).toEqual(listComponent.posts[2].previewLink);
  }));

  it("should have its post property set to whatever the last list item that was clicked was", async(() => {
    const listFixture = TestBed.createComponent(RedditPostListComponent);
    const listComponent: RedditPostListComponent = listFixture.debugElement.componentInstance;
    expect(app.post).toEqual(listComponent.posts[0]);
    const compiled = fixture.debugElement.nativeElement;
    
    compiled.querySelectorAll(".preview")[1].click();
    fixture.detectChanges();

    compiled.querySelectorAll(".preview")[0].click();
    fixture.detectChanges();

    expect(app.post).toEqual(listComponent.posts[0]);
    expect(compiled.querySelector('#fancyFrame').src).toEqual(listComponent.posts[0].previewLink);
  }));

  it("should have its post property update when the FancyFrameComponent has its titel card clicked", async(() => {
    const listFixture = TestBed.createComponent(RedditPostListComponent);
    const listComponent: RedditPostListComponent = listFixture.debugElement.componentInstance;
    expect(app.post).toEqual(listComponent.posts[0]);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#fancyFrame").src).toEqual(listComponent.posts[0].previewLink);

    compiled.querySelectorAll(".preview")[0].click();
    compiled.querySelector("#titlePanel").click();
    fixture.detectChanges();

    compiled.querySelectorAll(".preview")[0].click()
    fixture.detectChanges();

    expect(app.post).toEqual(listComponent.posts[0]);
    expect(compiled.querySelector("#fancyFrame").src).toEqual(listComponent.posts[0].previewLink);
  }));
});
