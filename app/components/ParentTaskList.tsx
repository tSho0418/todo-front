"use client";
import { useState } from "react";
import ChildTaskList from "./ChildTaskList";


export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 1 | 2 | 3;
  deadline?: string;
  belongsTo?: number | null;
  completed: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type CreateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

const ParentTaskList = ({
  tasks,
  onTaskUpdate,
}: {
  tasks: Task[];
  onTaskUpdate: (task: Task, isParentClick?: boolean) => void;
}) => {
  const [parentClicked, setParentClicked] = useState<number | null>(null);

  const handleParentCheck = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    onTaskUpdate(updatedTask, true);
  };

  const childTasks = (parentTask: Task) =>
    tasks.filter((t) => t.belongsTo === parentTask.id);

  return (
    <div>
      <ul>
        {tasks
          .filter(
            (task) => task.belongsTo === null || task.belongsTo === undefined
          )
          .map((task) => (
            <div key={task.id}>
              <li>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleParentCheck(task)}
                />
                {task.title}
                {task && (
                  <ChildTaskList
                    childTasks={childTasks(task)}
                    onTaskUpdate={onTaskUpdate}
                  />
                )}
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ParentTaskList;
