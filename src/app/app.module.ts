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
import { TaskDialogComponent } from './components/dialogues/task-dialog/task-dialog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DefinitionComponent } from './components/definition/definition.component';
import { EditFormDefinitionComponent } from './components/dialogues/edit-form-definition/edit-form-definition.component';
import { HttpClientModule } from '@angular/common/http';
import { PromptComponent } from './components/prompt/prompt.component';
import { DefaultPromptComponent } from './components/default-prompt/default-prompt.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormDefinitionComponent,
    PageNotFoundComponent,
    CreateFormDefinitionComponent,
    TaskDialogComponent,
    DefinitionComponent,
    EditFormDefinitionComponent,
    PromptComponent,
    DefaultPromptComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
