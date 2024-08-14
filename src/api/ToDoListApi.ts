export interface ToDoListApi {
    id?: number; // Optional for new tasks
    title: string;
    description?: string; // Optional
    status: string; // Change to TaskStatus enum
  }
  export interface Register{
    email:string;
    name:string;
    password:string;
    password_confirmation:string;
  }
  export interface Login{
    email:string;
    password:string;
  }
  // Define TaskStatus enum
 
  export const API_DATA_UPLOAD = {
    DATA_UPLOADED: false,
    TASK_DATA: [] as ToDoListApi[]
  }
  