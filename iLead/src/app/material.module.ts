import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule,
    MatToolbarModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatBadgeModule,
    MatToolbarModule,
    FormsModule
  ],
})
export class MaterialModule {}
