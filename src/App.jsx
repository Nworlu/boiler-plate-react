import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCounter,
  reduceCounter,
  resetCounter,
} from "./reducers/counterReducer";
import { Button, Checkbox, Form, Input, List, Skeleton } from "antd";
import {
  addTodoReducer,
  clearTodoReducer,
  deleteTodoReducer,
  editTodoReducer,
  toggleTodoReducer,
} from "./reducers/todoReducer";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const counterSelector = useSelector((state) => state.counter.counter);
  const todoSelector = useSelector((state) => state.todo.data);
  const [editValue, setEditValue] = useState([
    {
      name: ["text"],
      value: "",
    },
  ]);
  const [editTaskId, setEditTaskId] = useState();

  const handleFormSubmit = (values) => {
    console.log(values);
    dispatch(addTodoReducer(values.text));
    form.resetFields();
  };

  const handleEditForm = (id) => {
    const todoToEdit = todoSelector.find((todo) => todo.id === id);
    console.log(todoToEdit);
    setEditValue(() => [{ name: ["text"], value: todoToEdit.text }]);
    setEditTaskId(todoToEdit.id);
  };

  const handleDispatchForm = (id, value) => {
    dispatch(editTodoReducer(id, value));
    setEditTaskId("");
    form.resetFields();
  };

  console.log(editValue);

  return (
    <>
      <div className="flex items-center justify-center gap-[60px] h-screen">
        <div className="max-w-[50%] flex flex-col items-center justify-center gap-[30px]">
          <h1 className="text-[40px]">{counterSelector}</h1>
          <div className="flex items-center gap-[20px]">
            <button onClick={() => dispatch(addCounter())}>+</button>
            <button onClick={() => dispatch(resetCounter())}>Reset</button>
            <button onClick={() => dispatch(reduceCounter())}>-</button>
          </div>
        </div>
        <div className="max-w-[50%]">
          <Form
            form={form}
            name="control-hooks"
            onFinish={
              editTaskId
                ? () => handleDispatchForm(editTaskId, editValue[0].value)
                : handleFormSubmit
            }
            autoComplete="off"
            className="flex items-start gap-[14px]"
            fields={editValue}
            onFieldsChange={(_, allFields) => {
              setEditValue(allFields);
            }}
          >
            <Form.Item
              label="Todos"
              name={"text"}
              rules={[
                {
                  required: true,
                  message: "Please input your task!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form>
          <div className="flex flex-col items-center w-full gap-[40px]">
            <List
              style={{ maxHeight: 300 }}
              className="w-full"
              dataSource={todoSelector}
              renderItem={(todo, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Button onClick={() => handleEditForm(todo.id)} key={1}>
                      Edit
                    </Button>,
                    <Button
                      onClick={() => dispatch(deleteTodoReducer(todo.id))}
                      key={1}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <Skeleton title={false} active loading={false}>
                    <div className="flex items-center gap-[20px]">
                      <Checkbox
                        onClick={() => dispatch(toggleTodoReducer(todo.id))}
                        checked={todo.completed}
                      ></Checkbox>
                      <h1 className={`${todo.completed ? "line-through" : ""}`}>
                        {todo.text}
                      </h1>
                    </div>
                  </Skeleton>
                </List.Item>
              )}
            ></List>
            <Button onClick={() => dispatch(clearTodoReducer())}>
              Clear List
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
