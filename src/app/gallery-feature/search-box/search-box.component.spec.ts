import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { routes } from '../gallery-feature-routing.module';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GalleryFeatureModule } from '../gallery-feature.module';
import { Observable } from 'rxjs/Observable';
import { RedditPostService } from '../reddit-post-service';
import { RedditPost } from "../reddit-post";
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let redditPostService: RedditPostService;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let spy: jasmine.Spy;

  class ActiveRouteStub {
    queryParams = Observable.of({ q: "testTerm" })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ GalleryFeatureModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes) ],
      providers: [ FormBuilder, {provide: ActivatedRoute, useClass: ActiveRouteStub }, RedditPostService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    redditPostService = TestBed.get(RedditPostService);
    fixture.detectChanges();
    spy = spyOn(redditPostService, "fetchPostFromReddit")
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it("adds all fetched post to the service", async(() => {
    let expectedPost : RedditPost = new RedditPost();
    expectedPost.title = "tacocat";
    let returnedPosts = Observable.from([expectedPost]);
    spy.and.returnValue(returnedPosts);

    component.searchInput.setValue("cat");
    component.search();
    
    expect(spy.calls.argsFor(0)).toEqual(['cat']);
    expect(redditPostService.searchGallery).toContain(expectedPost);
    expect(redditPostService.searchGallery.length).toBe(1);
  }));

  it('passes the searchInput.value as a query param named searchTerm when navigating to the form', async(() => {
    component.searchInput.setValue("cat");
    fixture.detectChanges();
    
    let anchor: HTMLAnchorElement = fixture.debugElement.query(By.css(".postLink")).nativeElement;
    expect(anchor.href).toContain("/galleryform?searchTerm=cat");
  }));
});
