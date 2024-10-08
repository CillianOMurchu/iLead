import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { ChatbotComponent } from '@pages/chatbot/chatbot.component';
import { HomeComponent } from '@app/pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
