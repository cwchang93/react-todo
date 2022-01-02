import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function App() {
  const [tasks, setTasks] = useState([]);
  const [unfinishedTasks, setUnfinishedTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tasks"))
      setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  useEffect(() => {
    setUnfinishedTasks(() => {
      const newTasks = [...tasks];
      const unfinishedTasks = newTasks.filter((ele) => !ele.finished);
      return unfinishedTasks;
    });

    setFinishedTasks(() => {
      const newTasks = [...tasks];
      const finishedTasks = newTasks.filter((ele) => ele.finished);
      return finishedTasks;
    });
  }, [tasks]);

  const setLocalData = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const taskAddHandler = (taskText) => {
    setIsloading(true);
    setTimeout(() => {
      setTasks((prevTasks) => {
        const newTasks = prevTasks.concat({
          text: taskText,
          finished: false,
          finishedTime: null,
          id: +new Date(),
        });
        setLocalData(newTasks);
        return newTasks;
      });
      setIsloading(false);
    }, 1300);
  };

  const handleOnFinished = (task) => {
    if (!window.confirm("確定標註完成嗎？")) return;

    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      prevTasks.forEach((ele, idx) => {
        if (task.id === ele.id) {
          newTasks[idx]["finished"] = true;
          newTasks[idx]["finishedTime"] = +new Date();
        }
      });
      setLocalData(newTasks);
      return newTasks;
    });
  };

  const handleOnDelete = (task) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const filteredTasks = newTasks.filter((ele) => ele.id !== task.id);
      setLocalData(filteredTasks);
      return filteredTasks;
    });
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />{" "}
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="待辦事項" key="1">
          <Tasks
            items={unfinishedTasks}
            isLoading={isLoading}
            onFinish={handleOnFinished}
            onDelete={handleOnDelete}
            type="todo"
          />{" "}
        </TabPane>
        <TabPane tab="已完成事項" key="2">
          <Tasks items={finishedTasks} isLoading={isLoading} />{" "}
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
}

export default App;
