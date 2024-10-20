// src/store.ts
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { toast } from "react-toastify"; // Import toast

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  priority: string;
  dueDate: string;
  status: string;
}

interface TaskStore {
  tasks: TaskData[];
  addTask: (task: TaskData) => void;
  updateTask: (taskId: string, updatedTask: Partial<TaskData>) => void;
  updateStatus: (taskId: string, newStatus: string) => void;  
  removeTask: (taskId: string) => void;
  clearTasks: () => void;
}

// Create the store
const useStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => {
        set((state) => {
          const newTasks = [...state.tasks, task];
          toast.success("Task added successfully!"); // Show success toast
          return { tasks: newTasks };
        });
      },
      updateTask: (taskId, updatedTask) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          );
          toast.success("Task updated successfully!"); // Show success toast
          return { tasks: updatedTasks };
        });
      },
      updateStatus: (taskId, newStatus) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          );
          toast.info(`Status updated`); // Show info toast
          return { tasks: updatedTasks };
        });
      },
      removeTask: (taskId) => {
        set((state) => {
          const filteredTasks = state.tasks.filter((task) => task.id !== taskId);
          toast.error("Task removed successfully!"); // Show error toast
          return { tasks: filteredTasks };
        });
      },
      clearTasks: () => {
        set({ tasks: [] });
        toast.warning("All tasks cleared!"); // Show warning toast
      },
    }),
    {
      name: "task-storage",
      getStorage: () => localStorage,
    } as PersistOptions<TaskStore>
  )
);

export default useStore;
