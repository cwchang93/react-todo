import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import { useState } from "react";

const NewTask = (props) => {
  const [error, setError] = useState("");

  const enterTaskHandler = (taskText) => {
    if (!taskText) {
      setError("事項不得空白！");
    } else {
      setError("");
      props.onAddTask(taskText);
    }
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} isLoading={props.isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
