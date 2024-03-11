"use client";
import { Button } from "@/components/ui/button";
import React, { useReducer } from "react";

type Todo = {
  id: string;
  name: string;
  completed: boolean;
};

type AddTodo = {
  type: "add-todo";
  payload: Todo;
};

type DeleteTodo = {
  type: "delete-todo";
  payload: string;
};

type Action =
  | {
      type: "add-todo";
      payload: Todo;
    }
  | { type: "delete-todo"; payload: string }
  | { type: "set-complete"; payload: string };

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case "add-todo": {
      return [...state, action.payload];
    }
    case "delete-todo":
      return state.filter((todo) => todo.id !== action.payload);
    case "set-complete":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: true } : todo
      );
    default:
      return { ...state };
  }
}

const Todo = () => {
  const initialState: Todo[] = [];
  const [state, dispatch] = useReducer(reducer, initialState);

  function addTodo() {
    return dispatch({
      type: "add-todo",
      payload: {
        name: "newTodo",
        completed: false,
        id: new Date().getMilliseconds().toString(),
      },
    });
  }

  return (
    <div>
      <Button onClick={addTodo}>todo</Button>
      {state.map((todo) => (
        <>
          <li
            key={todo.id}
            className={todo.completed ? "text-red-500" : "text-slate-700"}
            onClick={() => {
              dispatch({
                type: "set-complete",
                payload: todo.id,
              });
            }}
          >
            {todo.name}
          </li>
          <Button
            onClick={() => {
              dispatch({
                type: "delete-todo",
                payload: todo.id,
              });
            }}
          >
            delete
          </Button>
        </>
      ))}
    </div>
  );
};

export default Todo;
