import React from "react";
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
        {childTasks.map((task) => (
          <li key={task.id}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheck(task)}
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <span className="ml-2 text-sm text-gray-700">{task.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChildTaskList;
