import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePersonalGalleryFormComponent } from './update-personal-gallery-form.component';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RedditPostService } from '../reddit-post-service';
import { By } from '@angular/platform-browser';

describe('UpdatePersonalGalleryFormComponent', () => {
  let component: UpdatePersonalGalleryFormComponent;
  let fixture: ComponentFixture<UpdatePersonalGalleryFormComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePersonalGalleryFormComponent ],
      imports: [ FormsModule ],
      providers: [ RedditPostService ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonalGalleryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  
  describe("validation", () => {
    let clearExtraSpace: Function = (string) => {
      return string.trim().replace(/\s+/, " ");
    }
    
    describe("title field", () => {
      let titleElement: HTMLInputElement;
      let titleLabelElement: HTMLLabelElement;

      beforeEach( ()=>{
        titleElement = element.query(By.css("#title")).nativeElement;
        titleLabelElement = element.query(By.css("[for='title']")).nativeElement
      });
      
      it("should not show a warning when the title is filled", async(()=>{
        fixture.whenStable().then(() => {
          titleElement.value = "set value"
          titleElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();

          titleLabelElement = element.query(By.css("[for='title']")).nativeElement
          let label: String = clearExtraSpace(titleLabelElement.textContent);
          expect(label).toBe("Title");
        });
      }));

      it("should show the '* is required' span when the title is blank", async(() =>{
          fixture.whenStable().then(() => {
            titleElement.value = "set value"
            titleElement.dispatchEvent(new Event("input"));
            fixture.detectChanges();
            
            titleElement.value = "" //clear the value;
            titleElement.dispatchEvent(new Event("input"));
            fixture.detectChanges();
            
            titleLabelElement = element.query(By.css("[for='title']")).nativeElement
            let label: String = clearExtraSpace(titleLabelElement.textContent);
            expect(label).toBe("Title * is required");
          });
      }));
    });

    describe("author field", () => {
      let authorElement: HTMLInputElement;
      let authorLabelElement: HTMLLabelElement;

      beforeEach( ()=>{
        authorElement = element.query(By.css("#author")).nativeElement;
        authorLabelElement = element.query(By.css("[for='author']")).nativeElement;
      });
      
      it("should not show a warning when the author is filled", async(()=>{
        fixture.whenStable().then(() => {
          authorElement.value = "set value"
          authorElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();

          authorLabelElement = element.query(By.css("[for='author']")).nativeElement;
          let label: String = clearExtraSpace(authorLabelElement.textContent);
          expect(label).toBe("Author");
        });
      }));

      it("should show the '* is required' span when the author is blank", async(() =>{
        fixture.whenStable().then(() => {
          authorElement.value = "set value"
          authorElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();
          
          authorElement.value = "" //clear the value;
          authorElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();
          
          authorLabelElement = element.query(By.css("[for='author']")).nativeElement;
          let label: String = clearExtraSpace(authorLabelElement.textContent);
          expect(label).toBe("Author * is required");
        });
      }));
    });

    describe("url field", () => {
      let previewLinkElement: HTMLInputElement;
      let previewLinkLabelElement: HTMLLabelElement;

      beforeEach( ()=>{
        previewLinkElement = element.query(By.css("#previewLink")).nativeElement;
        previewLinkLabelElement = element.query(By.css("[for='previewLink']")).nativeElement;
      });
      
      it("should not show a warning when the previewLink is filled with a http url", async(()=>{
        fixture.whenStable().then(() => {
          previewLinkElement.value = "http://www.banana.com";
          previewLinkElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();

          previewLinkLabelElement = element.query(By.css("[for='previewLink']")).nativeElement;
          let label: String = clearExtraSpace(previewLinkLabelElement.textContent);
          expect(label).toBe("Url");
        });
      }));

      it("should not show a warning when the previewLink is filled with a https url", async(()=>{
        fixture.whenStable().then(() => {
          previewLinkElement.value = "https://www.banana.com";
          previewLinkElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();

          previewLinkLabelElement = element.query(By.css("[for='previewLink']")).nativeElement;
          let label: String = clearExtraSpace(previewLinkLabelElement.textContent);
          expect(label).toBe("Url");
        });
      }));

      it("should show the '* is required' span when the previewLink is blank", async(() =>{
        fixture.whenStable().then(() => {
          previewLinkElement.value = "http://www.banana.com"
          previewLinkElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();
          
          previewLinkElement.value = "" //clear the value;
          previewLinkElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();
          
          previewLinkLabelElement = element.query(By.css("[for='previewLink']")).nativeElement;
          let label: String = clearExtraSpace(previewLinkLabelElement.textContent);
          expect(label).toBe("Url * is required");
        });
      }));

      it("should show the 'This field must be a url. Example: http://www.google.com' span when the previewLink does not match the pattern", async(() =>{
        fixture.whenStable().then(() => {
          previewLinkElement.value = "http://www.banana.com"
          previewLinkElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();
          
          previewLinkElement.value = "banana.com" //set the value to a non url;
          previewLinkElement.dispatchEvent(new Event("input"));
          fixture.detectChanges();
          
          previewLinkLabelElement = element.query(By.css("[for='previewLink']")).nativeElement;
          let label: String = clearExtraSpace(previewLinkLabelElement.textContent);
          expect(label).toBe("Url This field must be a url. Example: http://www.google.com");
        });
      }));
    });
  });


  describe("submit button", () => {
    let submitButton: HTMLButtonElement;
    let inputEvent = new Event("input");
    let titleElement: HTMLInputElement;
    let authorElement: HTMLInputElement;
    let permaLinkElement: HTMLInputElement;
    let previewLinkElement: HTMLInputElement;

    let completeForm: Function = () => {
      titleElement.value = "title"; titleElement.dispatchEvent(inputEvent);
      authorElement.value = "author"; authorElement.dispatchEvent(inputEvent);
      permaLinkElement.value = "http://www.perma.com"; permaLinkElement.dispatchEvent(inputEvent);
      previewLinkElement.value = "http://www.prev.com"; previewLinkElement.dispatchEvent(inputEvent);
    };

    let clearForm: Function = () => {
      titleElement.value = ""; titleElement.dispatchEvent(inputEvent);
      authorElement.value = ""; authorElement.dispatchEvent(inputEvent);
      permaLinkElement.value = ""; permaLinkElement.dispatchEvent(inputEvent);
      previewLinkElement.value = ""; previewLinkElement.dispatchEvent(inputEvent);
    }

    beforeEach( ()=>{
      titleElement = element.query(By.css("#title")).nativeElement;
      authorElement = element.query(By.css("#author")).nativeElement;
      permaLinkElement = element.query(By.css("#permaLink")).nativeElement;
      previewLinkElement = element.query(By.css("#previewLink")).nativeElement;
      submitButton = element.query(By.css("[type='submit']")).nativeElement;
      clearForm();
    });

    it("is disabled when the form is blank", async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        submitButton = element.query(By.css("[type='submit']")).nativeElement;
        expect(submitButton.disabled).toBe(true);
      });
    }));

    it("is enabled when the form is valid", async(() => {
      fixture.whenStable().then(() => {
        completeForm();
        fixture.detectChanges();

        submitButton = element.query(By.css("[type='submit']")).nativeElement;
        expect(submitButton.disabled).toBe(false);
      });
    }));

    it("sends a new RedditPost object to the RedditPostService when clicked", async(() => {
      fixture.whenStable().then(() => {
        let startingNumberOfPosts: number = component.redditPostService.personalGallery.length;
        completeForm();
        fixture.detectChanges();
    
        submitButton = element.query(By.css("[type='submit']")).nativeElement;
        submitButton.click();
    
        let endingNumberOfPosts: number = component.redditPostService.personalGallery.length;
        expect(endingNumberOfPosts).toBe(startingNumberOfPosts + 1);
    
        let lastPost = component.redditPostService.personalGallery[startingNumberOfPosts];
        expect(lastPost.title).toBe(titleElement.value);
        expect(lastPost.author).toBe(authorElement.value);
        expect(lastPost.permaLink).toBe(permaLinkElement.value);
        expect(lastPost.previewLink).toBe(previewLinkElement.value);
      });
    }));
  });

});
