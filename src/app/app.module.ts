import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { FancyFrameComponent } from './fancy-frame/fancy-frame.component';
import { RedditPostService } from './reddit-post-service';
import { RedditPostListComponent } from './reddit-post-list/reddit-post-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { HighlightHoverDirective } from './highlight-hover.directive';
import { TestHighlightHoverComponent } from './test-highlight-hover.component';
import { UpdatePersonalGalleryFormComponent } from './update-personal-gallery-form/update-personal-gallery-form.component';



@NgModule({
  declarations: [
    AppComponent,
    FancyFrameComponent,
    RedditPostListComponent,
    ListItemComponent,
    HighlightHoverDirective,
    TestHighlightHoverComponent,
    UpdatePersonalGalleryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [RedditPostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
