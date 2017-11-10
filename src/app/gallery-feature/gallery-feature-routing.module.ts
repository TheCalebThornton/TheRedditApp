import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePersonalGalleryFormComponent } from "./update-personal-gallery-form/update-personal-gallery-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: 'galleryform', component: UpdatePersonalGalleryFormComponent },
  { path: '', redirectTo: '/mygallery', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryFeatureRoutingModule { }