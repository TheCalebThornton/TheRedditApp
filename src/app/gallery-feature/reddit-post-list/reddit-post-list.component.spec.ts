import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RedditPostListComponent } from './reddit-post-list.component';
import { ListItemComponent } from "../list-item/list-item.component";
import { RedditPostService } from "../reddit-post-service";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RedditPostListComponent', () => {
  let component: RedditPostListComponent;
  let fixture: ComponentFixture<RedditPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditPostListComponent, ListItemComponent ],
      imports: [HttpClientTestingModule],
      providers: [RedditPostService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
