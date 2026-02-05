import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { IgrDatePicker } from "igniteui-react";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { Task } from "../../../components/ParentTaskList";


export type UpdateTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

const UpdateTaskModal = ({setTask, task}:{setTask:React.Dispatch<React.SetStateAction<Task>>, task: Task}) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<1 | 2 | 3>(task.priority);
  const datePickerRef = useRef<IgrDatePicker>(new Date(task.deadline));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deadline = datePickerRef.current?.value as string | undefined;
    const updateTask: UpdateTask = {
      title,
      description,
      priority,
      deadline: deadline,
      belongsTo: task.belongsTo,
      completed: task.completed,
    };
    const response = await updateTask(updateTask);
    if(response.ok){
      const savedTask = await response.json();
      setTask(savedTask);
    }
    setTitle("");
    setDescription("");
    setPriority(1);
    closeModal();
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div>
      <button onClick={openModal}>create modal</button>
      <Modal isOpen={modal} ariaHideApp={false}>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="タスク名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            placeholder="詳細"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
          >
            <option value={1}>低</option>
            <option value={2}>中</option>
            <option value={3}>高</option>
          </select>
          <IgrDatePicker
            ref={datePickerRef}
            displayFormat="shortDate"
            inputFormat="YY/MM/DD"
          />
          <button type="submit">更新</button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateTaskModal;


