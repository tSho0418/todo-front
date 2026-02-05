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
      <div className="flex justify-between items-center cursor-pointer" onClick={handleClick}>
        <h2 className="text-xl font-bold text-gray-700">
          {monthLabel}
        </h2>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      { isOpen &&
        <div className="mt-4">
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
