"use client"

import React, { useEffect, useState } from "react"

import ParentTaskList, {
  Task as TaskInterface,
} from "../../components/ParentTaskList";
import { getTaskById } from "@/app/services/taskService";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Detail(){
  const [task, setTask] = useState<TaskInterface>();
  const taskId = useParams().id;

  useEffect(() => {
    const fetchTask = async() => {
      try {
        const data = await getTaskById(taskId);
        setTask(data);
        console.log(data);
      }catch(error){
        console.error(error);
      }
    }

    fetchTask();
  },[]);

  const handleClickEdit = async () => {
    }

  const handleClickDelete = async () => {
  }

  return (
    <div>
      <h1>{task?.title}</h1>
      <div>
        <label>詳細</label>
        <div>{task?.description}</div>

        <label>優先度</label>
        <div>{task?.priority}</div>

        <label>期限</label>
        <div>{task?.deadline}</div>

        <label>ステータス</label>
        <div>{task?.completed}</div>
      </div>
      <Link href="/">
        <div>戻る</div>
      </Link>
      <button onClick={handleClickEdit}>編集</button>
      <button onClick={handleClickDelete}>削除</button>
    </div>
  );
}
