import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import type { Task } from '@app/models/kanban/task.model';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
    },
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  editTask(list: string, task: Task): void {}

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
// export class KanbanComponent {
//  // to be fetched from firebase eventually
//  todo: Task[] = [
//   {
//     title: 'Buy milk',
//     description: 'Go to the store and buy milk'
//   },
//   {
//     title: 'Create a Kanban app',
//     description: 'Using Firebase and Angular create a Kanban app!'
//   }
// ];
// inProgress: Task[] = [];
// done: Task[] = [];

// editTask(list: string, task: Task): void {}

// drop(event: CdkDragDrop<Task[]>): void {
//   if (event.previousContainer === event.container) {
//     return;
//   }
//   if (!event.container.data || !event.previousContainer.data) {
//     return;
//   }
//   transferArrayItem(
//     event.previousContainer.data,
//     event.container.data,
//     event.previousIndex,
//     event.currentIndex
//   );
// }
// }
