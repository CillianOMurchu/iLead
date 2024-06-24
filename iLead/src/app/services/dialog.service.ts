import { Inject, Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { EditFormDefinitionComponent } from '@app/components/dialogues/edit-form-definition/edit-form-definition.component';
import {
  FIRESTORE_COLLECTIONS,
  type FormDefinition,
  type FormDefinitionDialogResult,
} from '@app/models/form-definition.model';
import { FirestoreService } from '@app/services/firestore.service';
import { SnackBarService } from '@app/services/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    private firestoreService: FirestoreService,
    private snackBarService: SnackBarService
  ) {}

  openEditFormDefinitionDialog(definition: FormDefinition | DocumentData): any {
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
