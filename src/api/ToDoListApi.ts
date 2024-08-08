export interface ToDoListApi {
    id?: number; // Optional for new tasks
    title: string;
    description?: string; // Optional
    status: string; // Change to TaskStatus enum
  }
  
  // Define TaskStatus enum
 
  export const API_DATA_UPLOAD = {
    DATA_UPLOADED: false,
    TASK_DATA: [] as ToDoListApi[]
  }
  