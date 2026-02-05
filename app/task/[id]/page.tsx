"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getTaskById } from "../../services/taskService";
import { Task } from "../../components/ParentTaskList";
import UpdateTaskModal from "./components/UpdateTaskModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import Link from "next/link";

const TaskDetailPage = ({ params }: { params: { id: string } }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Corrected state variable name
  
  const router = useRouter(); // Get router instance
  const resolvedParams = use(params);
  const taskId = Number(resolvedParams.id);

  const fetchTask = async () => {
    setIsLoading(true);
    try {
      const data = await getTaskById(taskId);
      setTask(data);
    } catch (err) {
      setError("Failed to fetch task. Please check the ID and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleTaskUpdated = () => {
    fetchTask(); // Refetch the task data after an update
  };

  const handleTaskDeleted = () => {
    router.push('/'); // Redirect to home page after deletion
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="text-xl text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-sky-600 hover:underline">
          &larr; Back to Task List
        </Link>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Task not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Link href="/" className="text-sky-600 hover:underline mb-6 inline-block">
        &larr; Back to Task List
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsUpdateModalOpen(true)}
              className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              編集
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              削除
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-4">{task.description}</p>
        <div className="mt-6 border-t pt-4 space-y-2">
          <p><strong>優先度:</strong> {task.priority === 1 ? '低い' : task.priority === 2 ? '普通' : '高い'}</p>
          <p><strong>期限:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Not set'}</p>
          <p><strong>ステータス:</strong> {task.completed ? '完了' : '未完了'}</p>
        </div>
      </div>
      <UpdateTaskModal
        taskToUpdate={task}
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        onTaskUpdate={handleTaskUpdated}
      />
      <DeleteConfirmModal
        taskId={task.id}
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onTaskDelete={handleTaskDeleted}
      />
    </div>
  );
};

export default TaskDetailPage;
