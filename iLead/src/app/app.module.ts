import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeComponent } from '@pages/home/home.component';
import { FormDefinitionComponent } from '@pages/form-definition/form-definition.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { CreateFormDefinitionComponent } from '@components/dialogues/create-form-definition/create-form-definition.component';
import { MaterialModule } from '@material';
import { KanbanComponent } from '@pages/kanban/kanban.component';
import { TaskComponent } from '@app/components/kanban/task/task.component';
import { TaskDialogComponent } from './components/dialogues/task-dialog/task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormDefinitionComponent,
    PageNotFoundComponent,
    CreateFormDefinitionComponent,
    KanbanComponent,
    TaskComponent,
    TaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    DragDropModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
