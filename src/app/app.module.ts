import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TheRedditGalleryComponent } from './the-reddit-gallery/the-reddit-gallery.component';
import { AppRoutingModule } from './app.routing';
import { GalleryFeatureModule } from './gallery-feature/gallery-feature.module';

@NgModule({
  declarations: [
    AppComponent,
    TheRedditGalleryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    GalleryFeatureModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
