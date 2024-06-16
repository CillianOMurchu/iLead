import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Task } from '@app/models/kanban/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
}
