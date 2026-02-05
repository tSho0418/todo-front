"use client";
import { useContext, useState } from "react";
import ChildTaskList from "./ChildTaskList";
import CreateTaskModal from "./CreateTaskModal";
import { TaskSetterContext } from "../page";


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

  const setTasks = useContext(TaskSetterContext);
  
  const [isOpen, setIsOpen] = useState<boolean>(null);

  const handleParentCheck = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    onTaskUpdate(updatedTask, true);
  };

  const childTasks = (parentTask: Task) =>
    tasks.filter((t) => t.belongsTo === parentTask.id);

  return (
    <div className="pl-4">
      <ul className="space-y-4">
        {tasks
          .filter(
            (task) => task.belongsTo === null || task.belongsTo === undefined
          )
          .map((task) => (
            <li key={task.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleParentCheck(task)}
                  className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="ml-3 font-medium text-gray-800">{task.title}</span>
              </div>
              {task && (
                <div className="pl-8 pt-2">
                  <ChildTaskList
                    childTasks={childTasks(task)}
                    onTaskUpdate={onTaskUpdate}
                  />
                  <CreateTaskModal setTasks={setTasks} belongsToId={task.id}/>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ParentTaskList;
