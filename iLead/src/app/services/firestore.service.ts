import { Injectable, inject } from '@angular/core';
import {
  type DocumentData,
  doc,
  setDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { FIRESTORE_COLLECTIONS } from '@app/models/form-definition.model';
import {
  Firestore,
  collection,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async deleteDoc(collectionName: string, documentId: string): Promise<void> {
    try {
      console.log('collectionName:', collectionName);
      console.log('documentId:', documentId);

      const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
      await deleteDoc(docRef);
      console.log('Document successfully deleted.');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  async save(
    collectionName: string,
    data: DocumentData,
    customId: string
  ): Promise<string> {
    await setDoc(doc(this.firestore, collectionName, customId), data);

    return customId;
    // try {
    // const docRef = doc(this.firestore, `${collectionName}/${customId}`);
    // }
    //   console.log('data is ', data);
    //   const docRef = await addDoc(
    //     collection(this.firestore, collectionName),
    //     data
    //   );
    //   console.log('Document written with ID: ', docRef.id);
    //   return docRef.id;
    // try {
    // const docRef = await addDoc(
    // collection(this.firestore, collectionName),
    // data
    // );
    // return docRef.id;
    // } catch (error: any) {
    // console.log('error is ', error);
    // return error.message;
    // }
  }

  // async getCollection(
  //   collectionName = FIRESTORE_COLLECTIONS.DEFINITIONS
  // ): Promise<Observable<CollectionReference<DocumentData, DocumentData>>> {
  //   const collectionObservable = of(collection(this.firestore, collectionName));
  //   return collectionObservable;
  // }

  // getCollection(collectionName: string = FIRESTORE_COLLECTIONS.DEFINITIONS): Observable<DocumentData[]> {
  //   const collectionRef: CollectionReference<DocumentData> = collection(this.firestore, collectionName);
  //   return collection(collectionRef, { idField: 'id' }); // Adding idField to include the document ID in the data
  // }
  getCollection(collectionName: string): Observable<DocumentData[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }).pipe(
      map((data) => data as any[]) // Casting data to an array of any objects
    );
  }
}
