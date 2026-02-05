import { Task, CreateTask } from "../components/ParentTaskList";

const API_URL = "http://localhost:8085/api";

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getTaskById = async (id: number): Promise<Task> => {
  const res = await fetch(`${API_URL}/task/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const updateTask = async (task: Task): Promise<void> => {
  await fetch(`${API_URL}/task/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const createTask = async (task: CreateTask): Promise<Task> => {
  return await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};
