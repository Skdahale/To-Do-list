export type Priority = 'Low' | 'Normal' | 'High';
export type Status = 'Not Started' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  assignedTo: string;
  status: Status;
  dueDate: string;
  priority: Priority;
  comments: string;
}

