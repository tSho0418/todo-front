"use client";

import { useEffect, useState } from "react";
import ParentTaskList, {
  Task as TaskInterface,
} from "./components/ParentTaskList";
import { getAllTasks, updateTask } from "./services/taskService";
import CreateTaskModal from "./components/CreateTaskModal";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);


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
    <div>
      <div>Todoリスト</div>
      <DeadlineList tasks={tasks} onTaskUpdate={handleTaskUpdate as (task: TaskInterface) => void} />
      <CreateTaskModal setTasks={setTasks} /> 
    </div>
  );
}
