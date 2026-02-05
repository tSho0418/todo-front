import React, { useEffect, useState } from "react";
import ParentTaskList, { Task as TaskInterface } from "./ParentTaskList";
import DeadlineBar from "./DeadlineBar";
import { TaskSetterContext } from "../page";

interface FormattedTasksInterface {
  deadlineDate: string;
  groupDate: TaskInterface[]
}

const DeadlineList = ({
  tasks,
  onTaskUpdate,
}: {
  childTasks: TaskInterface[];
  onTaskUpdate: (task: TaskInterface, isParentClick?: boolean) => void;
}) => {
 const [groupDate, setGroupDate] = useState();

  useEffect(() => {
    const dateFormattedTasks = tasks.map((task) => {
      const deadlineDate = new Date(task.deadline);
      const monthKey = `${deadlineDate.getFullYear()}-${deadlineDate.getMonth()}`;
      return {...task, monthKey};
    });
    const group = Object.groupBy( dateFormattedTasks, ({ monthKey }) => monthKey); 
    setGroupDate(group);
    console.log(group);
    // console.log(groupDate);
  }, [tasks]);

  const formatMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    return `${year}年${parseInt(month) + 1}月`;
  };

  return (
    <div>
    {groupDate && Object.entries(groupDate).map(([monthKey, tasks]) => (
    <section key={monthKey} style={{ marginBottom: '20px' }}>
      <DeadlineBar tasks={tasks} onTaskUpdate={onTaskUpdate} monthLabel={formatMonthLabel(monthKey)} />
    </section>
  ))}
    </div>
  );
};

export default DeadlineList;
