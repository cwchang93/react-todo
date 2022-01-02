import Section from "../UI/Section";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";
import dayjs from "dayjs";

const Tasks = (props) => {
  let taskList = <h2>沒有代辦事項，快來新增!</h2>;

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task, idx) => (
          <TaskItem key={`${task}_${idx}`}>
            {task.text}
            {props.type === "todo" ? (
              <div>
                <button
                  onClick={props.onDelete && props.onDelete.bind(null, task)}
                >
                  刪除
                </button>
                <button
                  onClick={props.onFinish && props.onFinish.bind(null, task)}
                >
                  完成
                </button>
              </div>
            ) : (
              <div>{dayjs(task.finishedTime).format("YYYY-MM-DD")} 完成</div>
            )}
          </TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.isLoading) {
    content = "傳送中...";
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
