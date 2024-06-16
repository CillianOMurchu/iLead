import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '@app/components/dialogues/task-dialog/task-dialog.component';
import type {
  Task,
  TaskDialogResult,
  TaskList,
} from '@app/models/kanban/task.model';
import {
  Firestore,
  setDoc,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { runTransaction } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  firestore: Firestore = inject(Firestore);
  todo$: Observable<any[]>;
  inProgress$: Observable<any[]>;
  done$: Observable<any[]>;

  constructor(private dialog: MatDialog) {
    const todoCollection = collection(this.firestore, 'todo');
    this.todo$ = collectionData(todoCollection);
    const inProgressCollection = collection(this.firestore, 'inProgress');
    this.inProgress$ = collectionData(inProgressCollection);
    const doneCollection = collection(this.firestore, 'done');
    this.done$ = collectionData(doneCollection);
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (result: TaskDialogResult | undefined) => {
        ``;
        if (!result) {
          return;
        }
        try {
          const refId = 'id' + Math.random().toString(16).slice(2);
          await setDoc(doc(this.firestore, 'todo', refId), {
            ...result.task,
            id: refId,
          });
          console.log('Task added successfully.');
        } catch (error) {
          console.error('Error adding task:', error);
          throw error; // Propagate error to handle in component
        }
      });
  }

  async drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    const task = event.item.data;
    const previousCollectionName = event.previousContainer.id;
    const currentCollectionName = event.container.id;
    console.log('task is ', task);
    console.log('previousCollectionName is ', previousCollectionName);
    console.log('currentCollectionName is ', currentCollectionName);
    // try {
    //   await runTransaction(this.firestore, async (transaction) => {
    //     const sfDocRef = this.firestore.collection(previousCollectionName).doc(task.id).ref;
    //     const sfDoc = await transaction.get(sfDocRef);

    //     if (!sfDoc.exists) {
    //       throw new Error(`Document ${task.id} does not exist in ${previousCollectionName}`);
    //     }

    //     // Remove from previous collection
    //     transaction.delete(sfDocRef);

    //     // Add to current collection
    //     const newTaskRef = this.firestore.collection(currentCollectionName).doc(task.id).ref;
    //     transaction.set(newTaskRef, task);
    //   });

    //   console.log('Transaction successfully committed!');
    // } catch (error) {
    //   console.error('Transaction failed: ', error);
    // }
  }

  editTask(list: TaskList, task: Task): void {
    console.log('list is ', list);
    console.log('task is ', task);
    // const task = event.item.data;
    // const coll = collection(this.firestore, 'todo');
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        // const dataList = this['todo'];
        // console.log('dataList is ', dataList);
        // const taskIndex = dataList.indexOf(task);
        if (result.delete) {
          const ref = collection(this.firestore, 'todo/MjT4GOq1BwV8C52A8wWd');
          console.log('ref is ', ref);
          //   dataList.splice(taskIndex, 1);
          // await deleteDoc(doc(this.firestore, 'todo', result));
        } else {
          //   dataList[taskIndex] = task;
        }
      });
  }

  // async drop(event: CdkDragDrop<Task[]>): Promise<void> {
  // if (event.previousContainer === event.container) {
  //   return;
  // }
  // const item = event.previousContainer.data[event.previousIndex];
  // this.store.firestore.runTransaction(() => {
  //   const promise = Promise.all([
  //     this.store.collection(event.previousContainer.id).doc(item.id).delete(),
  //     this.store.collection(event.container.id).add(item),
  //   ]);
  //   return promise;
  // });
  // transferArrayItem(
  //   event.previousContainer.data,
  //   event.container.data,
  //   event.previousIndex,
  //   event.currentIndex
  // );

  //     try {
  //       await runTransaction(this.firestore, async (transaction) => {
  //         const sfDoc = await transaction.get(sfDocRef);
  //         if (!sfDoc.exists()) {
  //           throw "Document does not exist!";
  //         }

  //         const newPopulation = sfDoc.data().population + 1;
  //         transaction.update(sfDocRef, { population: newPopulation });
  //       });
  //       console.log("Transaction successfully committed!");
  //     } catch (e) {
  //       console.log("Transaction failed: ", e);
  //     }
  // }
}
