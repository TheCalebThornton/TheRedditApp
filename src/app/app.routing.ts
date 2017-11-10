import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheRedditGalleryComponent } from './the-reddit-gallery/the-reddit-gallery.component';

export const routes: Routes = [
    { path: 'mygallery', component: TheRedditGalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }