import React, { useState } from "react";
import Link from "next/link"; // Import Link
import { Task as TaskInterface } from "./ParentTaskList";
import ProgressBar from "./ProgressBar";

const ChildTaskList = ({
  childTasks,
  onTaskUpdate,
}: {
  childTasks: TaskInterface[];
  onTaskUpdate: (task: TaskInterface, isParentClick?: boolean) => void;
}) => {
  const completedCount = childTasks.filter((t) => t.completed).length;
  const totalCount = childTasks.length;
  const progressRatio = totalCount > 0 ? completedCount / totalCount : 0;

  const handleCheck = async (task: TaskInterface) => {
    const updatedTask = { ...task, completed: !task.completed };
    onTaskUpdate(updatedTask);
  };

  // Sort tasks by creation date to ensure a stable order
  const sortedChildTasks = [...childTasks].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-3">
      { totalCount > 0 &&
      <div className="flex items-center space-x-2">
        <ProgressBar value={completedCount} maxValue={totalCount} />
        <span className="text-sm font-medium text-gray-600 w-10 text-right">
          {Math.round(progressRatio * 100)}%
        </span>
      </div>
      }

      <ul className="space-y-2">
        {sortedChildTasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheck(task)}
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <Link href={`/task/${task.id}`} className="ml-2 text-sm text-gray-700 hover:text-sky-600">
                {task.title}
              </Link>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChildTaskList;
