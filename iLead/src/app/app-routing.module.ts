import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { ROUTES } from '@app/routes';

const routes: Routes = [
  { path: 'home', component: ROUTES.HomeComponent },
  { path: 'form-definition', component: ROUTES.FormDefinitionComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
