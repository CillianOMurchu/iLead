import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFormDefinitionComponent } from '@app/components/dialogues/create-form-definition/create-form-definition.component';
import type {
  FormDefinition,
  FormDefinitionDialogResult,
} from '@app/models/form-definition.model';
import {
  Firestore,
  setDoc,
  doc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { SnackBarService } from '@services/snack-bar.service';
import type { Observable } from 'rxjs/internal/Observable';
import { EditFormDefinitionComponent } from '@components/dialogues/edit-form-definition/edit-form-definition.component';
import { deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-form-definition',
  templateUrl: './form-definition.component.html',
  styleUrl: './form-definition.component.scss',
})
export class FormDefinitionComponent {
  firestore: Firestore = inject(Firestore);
  definitions$: Observable<any[]>;

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    const definitionCollection = collection(this.firestore, 'definitions');
    this.definitions$ = collectionData(definitionCollection);
  }

  newDefinition(): void {
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
          console.log('result is ', result);
          const refId = 'id' + Math.random().toString(16).slice(2);
          await setDoc(doc(this.firestore, 'definitions', refId), {
            ...result.definition,
            id: refId,
          });
          this.snackBarService.openSnackBar('Form Definition Saved');
        } catch (error) {
          console.error('Error adding task:', error);
          throw error; // Propagate error to handle in component
        }
      });
  }

  editDefinition(definition: FormDefinition): void {
    console.log('definition is ', definition);
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
        if (result.delete) {
          await deleteDoc(
            doc(this.firestore, 'definitions', result.definition.id)
          );
        }
        try {
          await setDoc(
            doc(this.firestore, 'definitions', result.definition.id),
            result.definition
          );
          this.snackBarService.openSnackBar('Form Definition Updated');
        } catch (error) {
          console.error('Error updating definition:', error);
          throw error; // Propagate error to handle in component
        }
      });
  }
}
