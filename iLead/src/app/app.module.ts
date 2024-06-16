import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '@pages/home/home.component';
import { FormDefinitionComponent } from '@pages/form-definition/form-definition.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { CreateFormDefinitionComponent } from '@components/dialogues/create-form-definition/create-form-definition.component';
import { MaterialModule } from './material.module';
import { KanbanComponent } from '@pages/kanban/kanban.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormDefinitionComponent,
    PageNotFoundComponent,
    CreateFormDefinitionComponent,
    KanbanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
