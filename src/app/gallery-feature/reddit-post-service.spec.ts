import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RedditPostService } from './reddit-post-service';

describe('RedditPostService', () => {
  let service: RedditPostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RedditPostService ]
    })
    service = TestBed.get(RedditPostService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
  
  it("should return a post when asked", () => {
    expect(service.nextPost()).not.toBeNull();
  });

  it("should return a different post each time asked", () => {
    let postOne = service.nextPost();
    let postTwo = service.nextPost();
    expect(postOne).not.toBeNull();
    expect(postTwo).not.toBeNull();
    expect(postOne).not.toBe(postTwo);
  });

  it("should loop through all posts", function(){
    let loopCount = service.personalGallery.length + 2;
    let previousPost = service.nextPost();
    for(let i = 0; i < loopCount; i++){
      let currentPost = service.nextPost();
      expect(previousPost).not.toBe(currentPost);
      previousPost = currentPost;
    }
  }); 
  
  it("should retrieve a post from reddit", async(() => {
    let searchTerm: String = "banana";
    let title = "a image of a banana";
    let author = "Bob Bobert";
    let previewLink = "http://www.urltoimage.com";
    let permaLink = "/r/art/comments/44p3lh/a_image_of_a_banana";

    service.fetchPostFromReddit(searchTerm)
      .subscribe((post) => {
        expect(post.title).toEqual(title);
        expect(post.author).toEqual(author);
        expect(post.previewLink).toEqual(previewLink);
        expect(post.permaLink).toEqual(permaLink);
      });

    let postRequest = httpMock.expectOne('https://www.reddit.com/r/Art/search/.json?q=' + searchTerm.replace(" ", '+')+ '&restrict_sr=on&sort=relevance&t=all&limit=10');
    postRequest.flush({
      "data": {
        "children": [
          {
            "data": {
              "id": "44p3lh",
              "preview": {
                  "images": [
                    {
                      "source": {
                        "url": previewLink
                      }
                    }
                  ],
              },
              "author": author,
              "permalink": permaLink,
              "title": title
            }
          }
        ]
      }
    });
  }));

  it("should ignore posts from reddit that do not have a preview section of json", async(() => {
    let searchTerm: String = "banana";
    
    service.fetchPostFromReddit(searchTerm)
      .subscribe(
        (post) => {
          fail("should not have a post to handle");
        },
        (error) => {
          fail("should not have a error to handle");
        },
        () => {
          expect(true).toBe(true);
        }
      );

    let postRequest = httpMock.expectOne('https://www.reddit.com/r/Art/search/.json?q=' + searchTerm.replace(" ", '+')+ '&restrict_sr=on&sort=relevance&t=all&limit=10');
    postRequest.flush({
      "data": {
        "children": [
          {
            "data": {
              "id": "44p3lh",
              
              "author": "author",
              "permalink": "permalink",
              "title": "title"
            }
          }
        ]
      }
    });
  }));
});