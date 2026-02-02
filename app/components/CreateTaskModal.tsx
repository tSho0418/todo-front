import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { IgrDatePicker } from "igniteui-react";
import "igniteui-webcomponents/themes/light/bootstrap.css";
import { createTask } from "../services/taskService";
import { CreateTask, Task } from "./ParentTaskList";

const CreateTaskModal = ({setTasks}:{setTasks:React.Dispatch<React.SetStateAction<Task>>}) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(1);
  const datePickerRef = useRef<IgrDatePicker>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deadline = datePickerRef.current?.value as string | undefined;
    const newTask: CreateTask = {
      title,
      description,
      priority,
      deadline: deadline,
      belongsTo: null,
      completed: false,
    };
    const response = await createTask(newTask);
    if(response.ok){
      const savedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, savedTask]);
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
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
          <IgrDatePicker
            ref={datePickerRef}
            displayFormat="shortDate"
            inputFormat="dd/MM/yy"
          />
          <button type="submit">作成</button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;


