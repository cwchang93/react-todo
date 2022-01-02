import { useRef, useEffect, useState } from "react";

import classes from "./TaskForm.module.css";

const TaskForm = (props) => {
  const taskInputRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();

    let enteredValue = taskInputRef.current.value;

    props.onEnterTask(enteredValue);
    if (!enteredValue) return;
    setDisabled(true);
    setTimeout(() => {
      taskInputRef.current.value = "";
      setDisabled(false);
    }, 1300);
  };

  useEffect(() => {
    console.log("change");
  }, [props.isLoading]);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button disabled={disabled}>
        {props.isLoading ? "傳送中..." : "新增"}
      </button>
    </form>
  );
};

export default TaskForm;
