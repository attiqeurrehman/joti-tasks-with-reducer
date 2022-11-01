import { useRef } from "react";
import { atom, useAtom } from "jotai";
import { useReducerAtom } from "jotai/utils";
import AddTask from "./AddTask.js";
import TaskList from "./TaskList.js";
import tasksReducer from "./tasksReducer.js";

const tasksAtom = atom([
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false }
]);

const nextIdAtom = atom(3);
export default function TaskApp() {
  const [tasks, dispatch] = useReducerAtom(tasksAtom, tasksReducer);
  const [nextId, setNextId] = useAtom(nextIdAtom);

  function handleAddTask(text) {
    dispatch({
      type: "added",
      id: setNextId(nextId + 1),
      text: text
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: "changed",
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "deleted",
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary {++useRef(0).current}</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
