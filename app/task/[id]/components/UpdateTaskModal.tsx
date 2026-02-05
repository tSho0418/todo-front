import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { IgrDatePicker } from "igniteui-react";
import { updateTask } from "../../../services/taskService";
import { Task } from "../../components/ParentTaskList";

const UpdateTaskModal = ({ taskToUpdate, isOpen, onRequestClose, onTaskUpdate }: { taskToUpdate: Task | null, isOpen: boolean, onRequestClose: () => void, onTaskUpdate: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(1);
  const datePickerRef = useRef<IgrDatePicker>(null);

  useEffect(() => {
    if (taskToUpdate) {
      setTitle(taskToUpdate.title);
      setDescription(taskToUpdate.description || "");
      setPriority(taskToUpdate.priority);
      // Use setTimeout to ensure the web component is ready to receive the value
      setTimeout(() => {
        if (datePickerRef.current) {
          if (taskToUpdate.deadline) {
            datePickerRef.current.value = new Date(taskToUpdate.deadline);
          } else {
            datePickerRef.current.value = null; // Clear if no deadline
          }
        }
      }, 0);
    }
  }, [taskToUpdate, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskToUpdate) return;

    const updatedTask: Task = {
      ...taskToUpdate,
      title,
      description,
      priority,
      deadline: datePickerRef.current?.value as string | undefined,
    };

    await updateTask(updatedTask);
    onTaskUpdate(); // Notify parent to refresh data
    onRequestClose(); // Close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">タスクを編集</h2>
          <button onClick={onRequestClose} className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="タスク名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <textarea
            name="description"
            placeholder="詳細"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          >
            <option value={1}>低</option>
            <option value={2}>中</option>
            <option value={3}>高</option>
          </select>
          <div className="text-gray-700 text-sm">締切:</div>
          <IgrDatePicker
            ref={datePickerRef}
            displayFormat="shortDate"
            inputFormat="yy/MM/dd"
            className="w-full"
          />
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateTaskModal;


