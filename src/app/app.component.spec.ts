import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { routes } from './app.routing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { AppModule } from "./app.module";
import { TheRedditGalleryComponent } from './the-reddit-gallery/the-reddit-gallery.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, HttpClientTestingModule, 
        RouterTestingModule.withRoutes(routes)],
      declarations: [ ],
      providers: [ ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'trg'`, async(() => {
    expect(app.title).toEqual('trg');
  }));
});
