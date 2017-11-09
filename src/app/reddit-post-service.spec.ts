import {RedditPostService} from './reddit-post-service';

describe('RedditPostService', () => {
  it('should create an instance', () => {
    expect(new RedditPostService()).toBeTruthy();
  });
  
  it("should return a post when asked", () => {
    let service = new RedditPostService();
    expect(service.nextPost()).not.toBeNull();
  });

  it("should return a different post each time asked", () => {
      let service = new RedditPostService();
      let post1 = service.nextPost();
      let post2 = service.nextPost();
      expect(post1).not.toBeNull();
      expect(post2).not.toBeNull();
      expect(post1).not.toBe(post2);
  });

  it("should loop through all posts", function(){
    let service = new RedditPostService();
    let totalSize = service.personalGallery.length
    let prevPost = service.nextPost();
    for(let i=0; i<totalSize*2; i++){
      let newPost = service.nextPost();
      expect(newPost).not.toBeNull();
      expect(newPost).not.toBe(prevPost);
      prevPost = newPost;
    }
  });     
});