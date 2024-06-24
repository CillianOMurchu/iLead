import { Injectable, inject } from '@angular/core';
import {
  type DocumentData,
  doc,
  setDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

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
