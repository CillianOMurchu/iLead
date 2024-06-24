import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFormDefinitionComponent } from '@app/components/dialogues/create-form-definition/create-form-definition.component';
import {
  FIRESTORE_COLLECTIONS,
  type FormDefinition,
  type FormDefinitionDialogResult,
} from '@app/models/form-definition.model';
import { SnackBarService } from '@services/snack-bar.service';
import type { Observable } from 'rxjs/internal/Observable';
import { EditFormDefinitionComponent } from '@components/dialogues/edit-form-definition/edit-form-definition.component';
import { type DocumentData } from 'firebase/firestore';
import { FirestoreService } from '@app/services/firestore.service';

@Component({
  selector: 'app-form-definition',
  templateUrl: './form-definition.component.html',
  styleUrl: './form-definition.component.scss',
})
export class FormDefinitionComponent {
  definitions$: Observable<DocumentData[]>;

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private firestoreService: FirestoreService
  ) {
    this.definitions$ = this.firestoreService.getCollection(
      FIRESTORE_COLLECTIONS.DEFINITIONS
    );
  }

  createDefinition(): void {
    const dialogRef = this.dialog.open(CreateFormDefinitionComponent, {
      data: {
        definition: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (result: FormDefinitionDialogResult | undefined) => {
        ``;
        if (!result) {
          return;
        }
        try {
          this.firestoreService.save(
            FIRESTORE_COLLECTIONS.DEFINITIONS,
            result.definition,
            result.definition.id
          );
          this.snackBarService.openSnackBar('Form Definition Saved');
        } catch (error) {
          console.error('Error adding task:', error);
          throw error; // Propagate error to handle in component
        }
      });
  }

  editDefinition(definition: FormDefinition): void {
    const dialogRef = this.dialog.open(EditFormDefinitionComponent, {
      data: {
        definition,
        enableDelete: true,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (result: FormDefinitionDialogResult | undefined) => {
        if (!result || !result.definition) {
          return;
        }
        console.log('result is ', result);
        const { definition } = result;
        const { id } = definition;

        if (result.delete) {
          this.firestoreService.deleteDoc(
            FIRESTORE_COLLECTIONS.DEFINITIONS,
            id
          );
        } else {
          try {
            this.firestoreService.save(
              FIRESTORE_COLLECTIONS.DEFINITIONS,
              definition,
              id
            );
            this.snackBarService.openSnackBar('Form Definition Updated');
          } catch (error) {
            console.error('Error updating definition:', error);
            throw error;
          }
        }
      });
  }
}
