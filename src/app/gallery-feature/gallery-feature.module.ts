import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { FancyFrameComponent } from './fancy-frame/fancy-frame.component';
import { RedditPostListComponent } from './reddit-post-list/reddit-post-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { HighlightHoverDirective } from './highlight-hover.directive';
import { TestHighlightHoverComponent } from './test-highlight-hover.component';
import { UpdatePersonalGalleryFormComponent } from './update-personal-gallery-form/update-personal-gallery-form.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TheRedditGalleryComponent } from '../the-reddit-gallery/the-reddit-gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RedditPostService } from './reddit-post-service';
import { GalleryFeatureRoutingModule } from './gallery-feature-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GalleryFeatureRoutingModule
  ],
  exports: [
    FancyFrameComponent,
    RedditPostListComponent,
    ListItemComponent,
    HighlightHoverDirective,
    UpdatePersonalGalleryFormComponent,
    SearchBoxComponent,
    PageNotFoundComponent
  ],
  declarations: [    
    FancyFrameComponent,
    RedditPostListComponent,
    ListItemComponent,
    HighlightHoverDirective,
    TestHighlightHoverComponent,
    UpdatePersonalGalleryFormComponent,
    SearchBoxComponent,
    PageNotFoundComponent
  ],  
  providers: [RedditPostService]
})
export class GalleryFeatureModule { }
