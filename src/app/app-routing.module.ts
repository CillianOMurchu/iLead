import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { HomeComponent } from '@pages/home/home.component';
// import { FormDefinitionComponent } from '@pages/form-definition/form-definition.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'form-definition', component: FormDefinitionComponent },
  // { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
