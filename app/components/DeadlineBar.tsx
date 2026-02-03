import React, { useEffect, useState } from "react";
import ParentTaskList, { Task as TaskInterface } from "./ParentTaskList";

interface FormattedTasksInterface {
  deadlineDate: string;
  groupDate: TaskInterface[]
}

const DeadlineBar = ({
  tasks,
  onTaskUpdate,
  monthLabel,
}: {
  childTasks: TaskInterface[];
  onTaskUpdate: (task: TaskInterface, isParentClick?: boolean) => void;
  monthLabel: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <h2 className="text-xl font-bold border-b">
        {monthLabel}
      </h2>
      <button onClick={handleClick}>button</button>
      { isOpen &&
        <div>
          
          <ParentTaskList
            tasks={tasks}
            onTaskUpdate={onTaskUpdate}
          />
        </div>
        }
      </div>
  );
};

export default DeadlineBar;
