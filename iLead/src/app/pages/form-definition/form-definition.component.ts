import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFormDefinitionComponent } from '@app/components/dialogues/create-form-definition/create-form-definition.component';
import type { FormDefinitionDialogResult } from '@app/models/form-definition.model';
import {
  Firestore,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { SnackBarService } from '@services/snack-bar.service';


@Component({
  selector: 'app-form-definition',
  templateUrl: './form-definition.component.html',
  styleUrl: './form-definition.component.scss',
})
export class FormDefinitionComponent {
  firestore: Firestore = inject(Firestore);

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  newTask(): void {
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
}
