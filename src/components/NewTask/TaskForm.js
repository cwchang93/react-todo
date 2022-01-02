import { useRef, useEffect, useState } from "react";

import classes from "./TaskForm.module.css";
import { Button } from "antd";

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

  return (
    <form className={classes.form}>
      <input type="text" ref={taskInputRef} />
      <Button
        className={"submitBtn"}
        type="primary"
        loading={disabled}
        onClick={submitHandler}
      >
        {disabled ? "傳送" : "新增"}
      </Button>
    </form>
  );
};

export default TaskForm;
