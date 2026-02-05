"use client";

import { useEffect, useState } from "react";
import ParentTaskList, {
  Task as TaskInterface,
} from "./components/ParentTaskList";
import { getAllTasks, updateTask } from "./services/taskService";
import CreateTaskModal from "./components/CreateTaskModal";
import DeadlineList from "./components/DeadlineList";
import { createContext } from "react"

export const TaskSetterContext = createContext<React.Dispatch<React.SetStateAction<TaskInterface[]>> | undefined>(undefined);

export default function Home() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const openParentModal = () => setIsParentModalOpen(true);
  const closeParentModal = () => setIsParentModalOpen(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskUpdate = async (
    taskToUpdate: TaskInterface,
    isParentClick: boolean = false
  ) => {
    try {
      await updateTask(taskToUpdate);

      if (isParentClick) {
        const children = tasks.filter((t) => t.belongsTo === taskToUpdate.id);
        const childUpdates = children.map((child) =>
          updateTask({ ...child, completed: taskToUpdate.completed })
        );
        await Promise.all(childUpdates);
      } else if (taskToUpdate.belongsTo) {
        const parentId = taskToUpdate.belongsTo;
        const childTasks = tasks.filter((t) => t.belongsTo === parentId);

        const latestChildStates = childTasks.map((t) =>
          t.id === taskToUpdate.id ? taskToUpdate : t
        );

        const allChildrenCompleted = latestChildStates.every((t) => t.completed);
        const parentTask = tasks.find((t) => t.id === parentId);

        if (parentTask && parentTask.completed !== allChildrenCompleted) {
          await updateTask({ ...parentTask, completed: allChildrenCompleted });
        }
      }
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  return (
    <div className="relative min-h-screen"> {/* Added relative positioning */}
      <main className="p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <TaskSetterContext.Provider value={setTasks}>
            <DeadlineList tasks={tasks} onTaskUpdate={handleTaskUpdate as (task: TaskInterface) => void} />
          </TaskSetterContext.Provider>
        </div>
      </main>

      {/* Floating Action Button for adding parent tasks */}
      <button
        onClick={openParentModal}
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 z-30"
        aria-label="Add new parent task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* CreateTaskModal for parent tasks */}
      <CreateTaskModal
        setTasks={setTasks}
        belongsToId={null}
        isOpen={isParentModalOpen}
        onRequestClose={closeParentModal}
        tasks={tasks}
      />
    </div>
  );
}
