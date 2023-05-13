import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { useRecoilState } from 'recoil';
import { todosState, countTodosState } from '../atoms/todoAtom';

function TodoList() {
  const [input, setInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [editTextInput, setEditTextInput] = useState('');

  // const [todos, setTodos] = useState([
  //   {
  //     id: nanoid(),
  //     text: 'Practice React',
  //     completed: false,
  //     shown: true,
  //   },
  //   {
  //     id: nanoid(),
  //     text: 'Practice JS',
  //     completed: true,
  //     shown: true,
  //   },
  // ]);

  const [todos, setTodos] = useRecoilState(todosState);
  const [countTodos, setCountTodos] = useRecoilState(countTodosState);

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === '') {
      console.log(e.target.value);
      const newShownTodos = todos.map((todo) => {
        return { ...todo, shown: true };
      });
      setTodos(newShownTodos);
    } else {
      const newShownTodos = todos.map((todo) => {
        const text = todo.text;
        if (text.toLowerCase().includes(e.target.value.toLowerCase())) {
          return { ...todo, shown: true };
        } else {
          return { ...todo, shown: false };
        }
      });
      setTodos(newShownTodos);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('todos')) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, []);
  console.log(countTodos);
  return (
    <div>
      <h1>TodoList</h1>
      <div style={{ marginBottom: '15px' }}>
        <input
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Type something to search todo"
        />
      </div>
      Todo(s) remaining:{' '}
      {todos.filter((todo) => todo.completed === false).length}
      <div style={{ marginTop: '5px' }}>
        {/* Input todo */}
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <input
          type="time"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
        />
        <div>
          <button
            onClick={() => {
              setTodos([
                ...todos,
                {
                  id: nanoid(),
                  text: input,
                  completed: false,
                  shown: true,
                  date: dateInput,
                  time: timeInput,
                },
              ]);
              setCountTodos(countTodos + 1);
              setInput('');
            }}
          >
            Add Todo
          </button>
          {/* Todos: */}

          <div style={{ marginTop: '10px' }}>
            {todos
              .filter((t) => t.shown)
              .map((todo) => {
                return (
                  <div>
                    <span>{todo.completed ? '✅' : '🟧'}</span>
                    {todo.editing ? (
                      <span>
                        <input
                          value={editTextInput}
                          onChange={(e) => setEditTextInput(e.target.value)}
                        />{' '}
                        <button
                          onClick={() => {
                            const newTodos = todos.map((t) => {
                              if (t.id === todo.id) {
                                return {
                                  ...t,
                                  text: editTextInput,
                                  editing: false,
                                };
                              }
                              return t;
                            });
                            setTodos(newTodos);
                          }}
                        >
                          ok
                        </button>
                        <button
                          onClick={() => {
                            const newTodos = todos.map((t) => {
                              if (t.id === todo.id) {
                                return { ...t, editing: false };
                              }
                              return t;
                            });
                            setTodos(newTodos);
                            setEditTextInput('');
                          }}
                        >
                          cancel
                        </button>
                      </span>
                    ) : (
                      <span
                        style={{
                          textDecoration: todo.completed
                            ? 'line-through'
                            : 'none',
                        }}
                      >
                        {todo.text}
                      </span>
                    )}
                    {!todo.editing ? (
                      <button
                        onClick={() => {
                          const newTodos = todos.map((t) => {
                            if (t.id === todo.id) {
                              return { ...t, editing: true };
                            }
                            return t;
                          });
                          setTodos(newTodos);
                          setEditTextInput(todo.text);
                        }}
                      >
                        edit
                      </button>
                    ) : null}
                    <span>
                      {todo.date} {todo.time}
                    </span>

                    <button
                      onClick={() => {
                        const newTodos = todos.map((t) => {
                          if (t.id === todo.id) {
                            return { ...t, completed: true };
                          }
                          return t;
                        });
                        setTodos(newTodos);
                      }}
                    >
                      complete
                    </button>
                    <button
                      onClick={() => {
                        const newTodos = todos.filter((t) => t.id !== todo.id);
                        setTodos(newTodos);
                      }}
                    >
                      delete
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
