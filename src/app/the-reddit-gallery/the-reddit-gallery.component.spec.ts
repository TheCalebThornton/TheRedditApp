import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { routes } from '../app.routing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from "../app.module";
import { GalleryFeatureModule } from "../gallery-feature/gallery-feature.module";
import { RedditPostService } from "../gallery-feature/reddit-post-service";
import { TheRedditGalleryComponent } from './the-reddit-gallery.component';

describe('TheRedditGalleryComponent', () => {
  let app: TheRedditGalleryComponent;
  let fixture: ComponentFixture<TheRedditGalleryComponent>;
  let service: RedditPostService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, GalleryFeatureModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ ],
      providers: [ RedditPostService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheRedditGalleryComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(RedditPostService);
  });

  it('should be created', () => {
    expect(app).toBeTruthy();
  });

  it("should initialize the value to whatever the first element in the array", async(() => {
    expect(app.post).toEqual(service.personalGallery[0]);
  }));

  it("should change the value of its post property when the img from the listItemComponent is clicked", async(() => {
    expect(app.post).toEqual(service.personalGallery[0]);
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelectorAll('.preview')[1].click();
    fixture.detectChanges();
    expect(app.post).toEqual(service.personalGallery[1]);
  }));

  it("should set the img in the FancyFrameComponent to be its post property when it changes", async(() =>{
    expect(app.post).toEqual(service.personalGallery[0]);
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelectorAll(".preview")[2].click();
    fixture.detectChanges();
    expect(app.post).toEqual(service.personalGallery[2]);
    expect(compiled.querySelector("#fancyFrame").src).toEqual(service.personalGallery[2].previewLink);
  }));

  it("should have its post property set to whatever the last list item that was clicked was", async(() => {
    expect(app.post).toEqual(service.personalGallery[0]);
    const compiled = fixture.debugElement.nativeElement;
    
    compiled.querySelectorAll(".preview")[1].click();
    fixture.detectChanges();

    compiled.querySelectorAll(".preview")[0].click();
    fixture.detectChanges();

    expect(app.post).toEqual(service.personalGallery[0]);
    expect(compiled.querySelector('#fancyFrame').src).toEqual(service.personalGallery[0].previewLink);
  }));

  it("should have its post property update when the FancyFrameComponent has its titel card clicked", async(() => {
    expect(app.post).toEqual(service.personalGallery[0]);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#fancyFrame").src).toEqual(service.personalGallery[0].previewLink);

    compiled.querySelectorAll(".preview")[0].click();
    compiled.querySelector("#titlePanel").click();
    fixture.detectChanges();

    compiled.querySelectorAll(".preview")[0].click()
    fixture.detectChanges();

    expect(app.post).toEqual(service.personalGallery[0]);
    expect(compiled.querySelector("#fancyFrame").src).toEqual(service.personalGallery[0].previewLink);
  }));
});
