import {RedditPostService} from './reddit-post-service';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
      let post1 = service.nextPost();
      let post2 = service.nextPost();
      expect(post1).not.toBeNull();
      expect(post2).not.toBeNull();
      expect(post1).not.toBe(post2);
  });

  it("should loop through all posts", function(){
    let totalSize = service.personalGallery.length
    let prevPost = service.nextPost();
    for(let i=0; i<totalSize*2; i++){
      let newPost = service.nextPost();
      expect(newPost).not.toBeNull();
      expect(newPost).not.toBe(prevPost);
      prevPost = newPost;
    }
  });
  
  it("should retrieve a post from reddit", async(() => {
    let searchTerm: String = "banana";
    let title = "a image of a banana";
    let author = "Bob Bobert";
    let previewLink = "http://www.urltoimage.com";
    let permalink = "/r/art/comments/44p3lh/a_image_of_a_banana";

    service.fetchPostFromReddit(searchTerm)
      .subscribe((post) => {
        expect(post.title).toEqual(title);
        expect(post.author).toEqual(author);
        expect(post.previewLink).toEqual(previewLink);
        expect(post.permaLink).toEqual(permalink);
      });

    let postRequest = httpMock.expectOne('https://www.reddit.com/r/Art/search/.json?q=' + searchTerm.replace(" ", '+')+ '&restrict_sr=on&sort=relevance&t=all&limit=100');
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
              "permalink": permalink,
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

    let postRequest = httpMock.expectOne('https://www.reddit.com/r/Art/search/.json?q=' + searchTerm.replace(" ", '+')+ '&restrict_sr=on&sort=relevance&t=all&limit=100');
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