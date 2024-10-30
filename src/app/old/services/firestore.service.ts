import { Injectable, inject } from '@angular/core';
import {
  type DocumentData,
  doc,
  setDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { SnackBarService } from '@app/services/snack-bar.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor(private snackBarService: SnackBarService) {}

  async updateDoc(
    collectionName: string,
    data: any | undefined
  ): Promise<void> {
    if (!data) {
      return;
    }

    const { id } = data;

    // if (data.delete) {
    //   this.deleteDoc(collectionName, id);
    // } else {
    try {
      this.save(collectionName, data, id);
      this.snackBarService.openSnackBar('Form Definition Updated');
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
    // }
  }

  async deleteDoc(collectionName: string, documentId: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  async save(
    collectionName: string,
    data: DocumentData,
    customId: string
  ): Promise<string> {
    try {
      console.log('data to save is ', data);
      await setDoc(doc(this.firestore, collectionName, customId), data);
      return customId;
    } catch (error) {
      return 'Error saving document:';
    }
  }

  getCollection(collectionName: string): Observable<DocumentData[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }).pipe(
      map((data) => data as DocumentData[])
    );
  }
}
