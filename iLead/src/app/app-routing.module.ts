import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './routes';

const routes: Routes = [
  { path: 'home', component: ROUTES.HomeComponent },
  { path: 'form-definition', component: ROUTES.FormDefinitionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
