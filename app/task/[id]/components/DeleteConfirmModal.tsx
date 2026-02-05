import React from 'react';
import Modal from 'react-modal';
import { deleteTask } from '../../../services/taskService'; // Corrected path

const DeleteConfirmModal = ({
  taskId,
  isOpen,
  onRequestClose,
  onTaskDelete,
}: {
  taskId: number;
  isOpen: boolean;
  onRequestClose: () => void;
  onTaskDelete: () => void;
}) => {
  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      onTaskDelete(); // Trigger refresh/redirect
    } catch (error) {
      console.error('Failed to delete task', error);
      // Optionally handle delete error in the UI
      onRequestClose(); // Close modal even if delete fails
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800">タスクの削除</h2>
        <p className="mt-2 text-gray-600">このタスクを削除します。</p>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            キャンセル
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            削除
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
