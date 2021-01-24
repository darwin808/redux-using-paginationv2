import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import PeopleReducer from "./Reducers/PeopleReducer";
import {
  addpeople,
  decrement,
  deletepeople,
  increment,
  updatepeople,
} from "./Actions/Actions";

function App() {
  const [name, setname] = useState("");
  const [modal, setModal] = useState(false);
  const [idholder, setidholder] = useState(0);
  const [edit, setedit] = useState("");
  const people = useSelector((e) => e.PeopleReducer.people);
  const counter = useSelector((e) => e.CounterReducer);
  const dispatch = useDispatch();
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(5);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(addpeople({ name, id: Math.random() }));
  };

  const openmodal = (id) => {
    setidholder(id);
    setModal(true);
  };
  const handleedit = (e) => {
    e.preventDefault();
    dispatch(updatepeople({ idholder, edit }));
  };

  const indexOfLastItem = currentpage * postperpage;
  const indexOfFirstItem = indexOfLastItem - postperpage;
  const posts = people.slice(indexOfFirstItem, indexOfLastItem);

  const pagenum = [];
  for (let i = 1; i <= Math.ceil(people.length / postperpage); i++) {
    pagenum.push(i);
  }

  return (
    <div className="App">
      <h1>redux</h1>
      {counter}
      <button
        onClick={() => {
          dispatch(increment());
        }}>
        ADD
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        MINUS
      </button>

      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </form>

      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit}
            onChange={(e) => {
              setedit(e.target.value);
            }}
          />
        </form>
      )}

      {posts.map((e) => (
        <div key={e.id}>
          {e.name}{" "}
          <button
            onClick={() => {
              dispatch(deletepeople(e.id));
            }}>
            delete
          </button>
          <button
            onClick={() => {
              openmodal(e.id);
            }}>
            edit
          </button>
        </div>
      ))}

      {pagenum.map((e) => (
        <div
          onClick={() => {
            setcurrentpage(e);
          }}
          key={e}>
          {e}
        </div>
      ))}
    </div>
  );
}

export default App;
