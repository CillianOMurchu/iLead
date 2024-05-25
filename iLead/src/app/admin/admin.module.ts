import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { FormDefinitionComponent } from './pages/form-definition/form-definition.component';



@NgModule({
  declarations: [
    HomeComponent,
    FormDefinitionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
