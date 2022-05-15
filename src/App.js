import { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import React from "react";
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatcherContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 4,
    content: "오늘의 일기 1번",
    date: 1651330800000,
  },
  {
    id: 2,
    emotion: 1,
    content: "오늘의 일기 2번",
    date: 1651330800001,
  },
  {
    id: 3,
    emotion: 2,
    content: "오늘의 일기 3번",
    date: 1651330800002,
  },
  {
    id: 4,
    emotion: 3,
    content: "오늘의 일기 4번",
    date: 1651330800003,
  },
  {
    id: 5,
    emotion: 4,
    content: "오늘의 일기 5번",
    date: 1651330800004,
  },
  {
    id: 6,
    emotion: 5,
    content: "오늘의 일기 6번",
    date: 1651330800005,
  },
];
// COMPONENTS
function App() {
  const [data, dispatch] = useReducer(reducer, [dummyData]);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: { id: targetId, date: new Date(date).getTime(), content, emotion },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatcherContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="new" element={<New />} />
              <Route path="edit" element={<Edit />} />
              <Route path="diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatcherContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
