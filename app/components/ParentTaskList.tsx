"use client";
import { useContext, useState } from "react";
import Link from "next/link"; // Import Link
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
  onTaskUpdate: onTaskUpdateProp, // Renamed for clarity
}: {
  tasks: Task[];
  onTaskUpdate: (task: Task, isParentClick?: boolean) => void;
}) => {
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false);
  const [currentParentTaskId, setCurrentParentTaskId] = useState<number | null>(null);

  const setTasks = useContext(TaskSetterContext);

  const handleParentCheck = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    onTaskUpdateProp(updatedTask, true);
  };

  const childTasks = (parentTask: Task) =>
    tasks.filter((t) => t.belongsTo === parentTask.id);

  const openSubTaskModal = (parentId: number) => {
    setCurrentParentTaskId(parentId);
    setIsSubTaskModalOpen(true);
  };

  const closeSubTaskModal = () => {
    setIsSubTaskModalOpen(false);
    setCurrentParentTaskId(null);
  };

  return (
    <div className="pl-4">
      <ul className="space-y-4">
        {tasks
          .filter(
            (task) => task.belongsTo === null || task.belongsTo === undefined
          )
          .map((task) => (
            <li key={task.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleParentCheck(task)}
                    className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <Link href={`/task/${task.id}`} className="ml-3 font-medium text-gray-800 hover:text-sky-600">
                    {task.title}
                  </Link>
                </div>
              </div>
              {task && (
                <div className="pl-8 pt-2">
                  <ChildTaskList
                    childTasks={childTasks(task)}
                    onTaskUpdate={onTaskUpdateProp}
                  />
                  <button
                    onClick={() => openSubTaskModal(task.id)}
                    className="mt-2 text-sm text-sky-600 hover:text-sky-800 font-medium"
                  >
                    + サブタスクを追加
                  </button>
                </div>
              )}
            </li>
          ))}
      </ul>

      <CreateTaskModal
        setTasks={setTasks as React.Dispatch<React.SetStateAction<Task[]>>}
        belongsToId={currentParentTaskId}
        isOpen={isSubTaskModalOpen}
        onRequestClose={closeSubTaskModal}
        tasks={tasks}
      />
    </div>
  );
};

export default ParentTaskList;
