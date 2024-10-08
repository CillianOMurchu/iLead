import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFormDefinitionComponent } from '@app/components/dialogues/create-form-definition/create-form-definition.component';
import {
  FIRESTORE_COLLECTIONS,
  type FormDefinition,
  type FormDefinitionDialogResult,
} from '@app/models/form-definition.model';
import { SnackBarService } from '@services/snack-bar.service';
import type { Observable } from 'rxjs/internal/Observable';
import { type DocumentData } from 'firebase/firestore';
import { FirestoreService } from '@app/services/firestore.service';
import { FormDefinitionService } from '@app/services/form-definition.service';

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
    private firestoreService: FirestoreService,
    private formDefinitionService: FormDefinitionService
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
            result.definition.name
          );
          this.snackBarService.openSnackBar('Form Definition Saved');
        } catch (error) {
          console.error('Error adding task:', error);
          throw error; // Propagate error to handle in component
        }
      });
  }

  editDefinition(definition: FormDefinition): void {
    this.formDefinitionService.editDefinition(definition);
  }
}
