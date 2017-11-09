import { RedditPost } from "./reddit-post";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RedditPostService {
    personalGallery: RedditPost[] = [];
    nextIndex: number = 0;

    constructor(private http: HttpClient){
        let post1 = new RedditPost();
        post1.author = "matway";
        post1.permaLink = "https://i.redditmedia.com/q7aeUChI6iLxP-x6FniA2HOUJFMHmm9B5HA_vmNIWQc.jpg";
        post1.title = "Island. Watercolor. 40x30cm.";
        post1.previewLink = "https://i.redd.it/6z6ka6q40kwz.jpg";
        this.personalGallery.push(post1);

        let post2 = new RedditPost();
        post2.author = "daking17";
        post2.permaLink = "https://i.redditmedia.com/SnhuFJc-oqFxq0TTBBL4-JilnNl2x4cRVDJkyJx3OWs.jpg";
        post2.title = "Hard to breathe, acrylic on canvas, 26x30.";
        post2.previewLink = "https://i.redd.it/a0vj0wkdgkwz.jpg";
        this.personalGallery.push(post2);

        let post3 = new RedditPost();
        post3.author = "salt_watercolors";
        post3.permaLink = "https://i.redditmedia.com/vvy-cn2nei2eiENOsN9ppoBL6NHfm-fKxfE5zw2QW_A.jpg";
        post3.title = "Shine, watercolor, 12x16";
        post3.previewLink = "https://i.redd.it/wof8oq9s1dwz.jpg";
        this.personalGallery.push(post3);
    }

    nextPost(): RedditPost{
        if(this.nextIndex >= this.personalGallery.length){
            this.nextIndex = 0;
        }
        let post = this.personalGallery[this.nextIndex]
        this.nextIndex++;
        return post;
    }

    fetchPostFromReddit(searchTerm: String): Observable<RedditPost>{
        return this.http.get('https://www.reddit.com/r/Art/search/.json?q=' + 
                searchTerm.replace(" ", '+') + '&restrict_sr=on&sort=relevance&t=all&limit=100')
        .mergeMap((response: any, i) => {
            return response.data.children 
        })
        .filter((result: any) => {
            return result.data.preview != null;
        })
        .map((result: any) => { 
            let post: RedditPost = new RedditPost();
            post.title = result.data.title;
            post.author = result.data.author;
            post.permaLink = result.data.permalink;
            post.previewLink = result.data.preview.images[0].source.url;
            return post; 
        });
    }
}
