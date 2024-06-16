import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '@app/components/dialogues/task-dialog/task-dialog.component';
import type {
  Task,
  TaskDialogResult,
  TaskList,
} from '@app/models/kanban/task.model';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from 'firebase/firestore';

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
    const todoCollection = collection(this.firestore, 'tasks');
    this.todo$ = collectionData(todoCollection);

    const inProgressCollection = collection(this.firestore, 'tasks');
    this.inProgress$ = collectionData(inProgressCollection);
    const doneCollection = collection(this.firestore, 'tasks');
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
        if (!result) {
          return;
        }
        // this.todo$.push(result.task);
        await setDoc(doc(this.firestore, 'tasks', 'To Do'), result.task);
      });
  }
  editTask(list: TaskList, task: Task): void {

  }

  // editTask(list: TaskList, task: Task): void {
  //   const dialogRef = this.dialog.open(TaskDialogComponent, {
  //     width: '270px',
  //     data: {
  //       task,
  //       enableDelete: true,
  //     },
  //   });
  //   dialogRef
  //     .afterClosed()
  //     .subscribe((result: TaskDialogResult | undefined) => {
  //       if (!result) {
  //         return;
  //       }
  //       const dataList = this[list];
  //       const taskIndex = dataList.indexOf(task);
  //       if (result.delete) {
  //         dataList.splice(taskIndex, 1);
  //       } else {
  //         dataList[taskIndex] = task;
  //       }
  //     });
  // }

  drop(event: CdkDragDrop<Task[]>): void {
  //   if (event.previousContainer === event.container) {
  //     return;
  //   }
  //   const item = event.previousContainer.data[event.previousIndex];
  //   this.store.firestore.runTransaction(() => {
  //     const promise = Promise.all([
  //       this.store.collection(event.previousContainer.id).doc(item.id).delete(),
  //       this.store.collection(event.container.id).add(item),
  //     ]);
  //     return promise;
  //   });
  //   transferArrayItem(
  //     event.previousContainer.data,
  //     event.container.data,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  }
}
