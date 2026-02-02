import React from "react";
import { Task as TaskInterface } from "./ParentTaskList";

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
    <div>
      { totalCount > 0 &&
      <div style={{ marginBottom: "10px" }}>
        <progress value={completedCount} max={totalCount} />
        <span style={{ marginLeft: "10px" }}>
          {Math.round(progressRatio * 100)}%
        </span>
      </div>
      }

      <ul>
        {childTasks.map((task) => (
          <li key={task.id} style={{ listStyle: "none" }}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheck(task)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChildTaskList;
